import os
from flask import after_this_request, jsonify
from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Float,
    alias,
    or_,
    func,
    case,
)
from sqlalchemy.dialects.postgresql import ARRAY as Array
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
import flask_restless as fr
from .search_sort import (
    searchable_query,
    sorted_by_relationship,
    sorted_by_cases,
    request_max_dist,
    request_user_loc,
    should_default_sort,
)

db = SQLAlchemy()


def distance(pt1, pt2):
    lat1, lon1 = pt1
    lat2, lon2 = pt2
    R = 3961

    dlat = func.radians(lat2 - lat1)
    dlon = func.radians(lon2 - lon1)

    a = func.power(func.sin(dlat / 2), 2) + func.cos(func.radians(lat1)) * func.cos(
        func.radians(lat2)
    ) * func.power(func.sin(dlon / 2), 2)
    c = 2 * func.atan2(func.sqrt(a), func.sqrt(1 - a))
    d = R * c
    return d


class Pet(db.Model):
    __tablename__ = "pet"
    # Do not need to set--autogenerated
    id = Column(Integer, primary_key=True)
    name = Column(String(500), nullable=False)
    # Dog/Cat
    species = Column(String(10), nullable=False)
    # Male/Female
    gender = Column(String(20))

    # Do not need to set--autogenerated when dog_breed or cat_breed is assigned
    primary_dog_breed_id = Column(Integer, ForeignKey("dog_breed.id"))
    secondary_dog_breed_id = Column(Integer, ForeignKey("dog_breed.id"))
    primary_cat_breed_id = Column(Integer, ForeignKey("cat_breed.id"))
    secondary_cat_breed_id = Column(Integer, ForeignKey("cat_breed.id"))

    """
    Pass a reference to a dog or cat breed object--this will require some
    searching over existing dog or cat breeds in table if the strings from
    the petfinder breed api aren't a perfect match
    """
    primary_dog_breed = relationship(
        "DogBreed", backref="dogs", foreign_keys=[primary_dog_breed_id]
    )
    secondary_dog_breed = relationship(
        "DogBreed", foreign_keys=[secondary_dog_breed_id]
    )
    primary_cat_breed = relationship(
        "CatBreed", backref="cats", foreign_keys=[primary_cat_breed_id]
    )
    secondary_cat_breed = relationship(
        "CatBreed", foreign_keys=[secondary_cat_breed_id]
    )

    primary_fallback_breed = Column(String(100))
    secondary_fallback_breed = Column(String(100))

    # Do not need to set--autogenerated when shelters is assigned
    shelter_id = Column(Integer, ForeignKey("shelter.id"))

    # Pass a reference to the shelter object
    shelter_ref = relationship("Shelter", back_populates="pets")

    size = Column(String(20))
    photos_small = Column(Array(String(500)))
    photos_full = Column(Array(String(500)))
    color = Column(String(50))
    age = Column(String(20))
    description = Column(String(5000))
    url = Column(String(500))

    def primary_breed(self):
        id = None
        name = None
        if self.primary_dog_breed:
            id = self.primary_dog_breed_id
            name = self.primary_dog_breed.name
        elif self.primary_cat_breed:
            id = self.primary_cat_breed_id
            name = self.primary_cat_breed.name

        return {"id": id, "name": name, "fallback": self.primary_fallback_breed}

    def secondary_breed(self):
        id = None
        name = None
        if self.secondary_dog_breed:
            id = self.secondary_dog_breed_id
            name = self.secondary_dog_breed.name
        elif self.secondary_cat_breed:
            id = self.secondary_cat_breed_id
            name = self.secondary_cat_breed.name

        return {"id": id, "name": name, "fallback": self.secondary_fallback_breed}

    def shelter(self):
        if self.shelter_ref:
            id = self.shelter_ref.id
            name = self.shelter_ref.name
        else:
            id = None
            name = None
        return {"id": id, "name": name}

    def photos(self):
        return {"small": self.photos_small, "full": self.photos_full}

    @classmethod
    @sorted_by_relationship(
        "name",
        "primary_dog_breed",
        "secondary_dog_breed",
        "primary_cat_breed",
        "secondary_cat_breed",
    )
    @sorted_by_cases(names=("age",), cases=("Baby", "Young", "Adult", "Senior"))
    @sorted_by_cases(names=("size",), cases=("Small", "Medium", "Large", "Extra Large"))
    @searchable_query(
        name,
        species,
        gender,
        primary_fallback_breed,
        secondary_fallback_breed,
        size,
        color,
        age,
        description,
    )
    def query(cls):
        query = db.session.query(cls)

        max_dist = request_max_dist()
        if max_dist is None:
            return query

        user_loc = request_user_loc()
        query = query.join(cls.shelter_ref).filter(
            distance(user_loc, (Shelter.latitude, Shelter.longitude)) <= max_dist
        )
        if should_default_sort():
            query = query.order_by(
                distance(user_loc, (Shelter.latitude, Shelter.longitude))
            )

        return query


pet_includes = [
    "id",
    "name",
    "species",
    "gender",
    "size",
    "color",
    "age",
    "description",
    "url",
]
pet_methods = ["primary_breed", "secondary_breed", "shelter", "photos"]


class DogBreed(db.Model):
    __tablename__ = "dog_breed"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    temperament = Column(String(1000))
    life_span_low = Column(Integer)
    life_span_high = Column(Integer)
    height_imperial_low = Column(Integer)
    height_imperial_high = Column(Integer)
    weight_imperial_low = Column(Integer)
    weight_imperial_high = Column(Integer)
    bred_for = Column(String(1000))
    breed_group = Column(String(100))
    photo = Column(String(500))
    video_url = Column(String(500))

    def life_span(self):
        return {"low": self.life_span_low, "high": self.life_span_high}

    def height_imperial(self):
        return {"low": self.height_imperial_low, "high": self.height_imperial_high}

    def weight_imperial(self):
        return {"low": self.weight_imperial_low, "high": self.weight_imperial_high}

    def dog_ids(self):
        return [dog.id for dog in self.dogs]

    def shelters_with_breed(self):
        shelters = (
            db.session.query(Shelter.id)
            .join(Pet, Shelter.pets)
            .filter(
                or_(
                    Pet.primary_dog_breed_id == self.id,
                    Pet.secondary_dog_breed_id == self.id,
                )
            )
            .distinct()
            .all()
        )

        return [shelter[0] for shelter in shelters]

    @classmethod
    @searchable_query(
        name, temperament, bred_for, breed_group,
    )
    def query(cls):
        return db.session.query(cls)


dog_breed_includes = [
    "id",
    "name",
    "temperament",
    "bred_for",
    "breed_group",
    "photo",
    "video_url",
]
dog_breed_methods = [
    "life_span",
    "height_imperial",
    "weight_imperial",
    "dog_ids",
    "shelters_with_breed",
]


class CatBreed(db.Model):
    __tablename__ = "cat_breed"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    alt_names = Column(Array(String(300)))
    temperament = Column(String(1000))
    life_span_low = Column(Integer)
    life_span_high = Column(Integer)
    # 0-1
    indoor = Column(Integer)
    # 1-5
    dog_friendly = Column(Integer)
    # 1-5
    child_friendly = Column(Integer)
    # 1-5
    grooming_level = Column(Integer)
    photo = Column(String(500))
    video_url = Column(String(500))

    def life_span(self):
        return {"low": self.life_span_low, "high": self.life_span_high}

    def cat_ids(self):
        return [cat.id for cat in self.cats]

    def shelters_with_breed(self):
        shelters = (
            db.session.query(Shelter.id)
            .join(Pet, Shelter.pets)
            .filter(
                or_(
                    Pet.primary_cat_breed_id == self.id,
                    Pet.secondary_cat_breed_id == self.id,
                )
            )
            .distinct()
            .all()
        )

        return [shelter[0] for shelter in shelters]

    @classmethod
    @searchable_query(name, temperament)
    def query(cls):
        return db.session.query(cls)


cat_breed_includes = [
    "id",
    "name",
    "alt_names",
    "temperament",
    "indoor",
    "dog_friendly",
    "child_friendly",
    "grooming_level",
    "photo",
    "video_url",
]
cat_breed_methods = ["life_span", "cat_ids", "shelters_with_breed"]


class Shelter(db.Model):
    __tablename__ = "shelter"
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    address1 = Column(String(200))
    address2 = Column(String(200))
    city = Column(String(50))
    state = Column(String(50))
    postcode = Column(Integer)
    country = Column(String(100))
    photos_small = Column(Array(String(500)))
    photos_full = Column(Array(String(500)))
    email = Column(String(500))
    phone_number = Column(String(300))
    mission = Column(String(2000))
    adoption_policy = Column(String(2000))
    latitude = Column(Float)
    longitude = Column(Float)
    has_cats = Column(Integer)
    has_dogs = Column(Integer)

    # references to all pets for shelters, generated by setting shelter in pet instances
    pets = relationship("Pet", back_populates="shelter_ref")

    def address(self):
        return {
            "address1": self.address1,
            "address2": self.address2,
            "city": self.city,
            "state": self.state,
            "postcode": self.postcode,
            "country": self.country,
        }

    def contact(self):
        return {"email": self.email, "phone_number": self.phone_number}

    def all_pets(self):
        pets_dict = {}
        pet_num = 0

        for pet in self.pets:
            if pet.primary_dog_breed or pet.primary_cat_breed:
                pets_dict[pet_num] = {
                    "id": pet.id,
                    "name": pet.name,
                    "photos": pet.photos_small,
                }
                pet_num += 1

        return pets_dict

    def top_dog_breed_id(self):
        dog_counts = {}
        for pet in self.pets:
            if pet.primary_dog_breed:
                id = pet.primary_dog_breed_id
                if id in dog_counts:
                    dog_counts[id] += 1
                else:
                    dog_counts[id] = 1

        if dog_counts:
            return max(dog_counts, key=lambda key: dog_counts[key])
        return None

    def top_cat_breed_id(self):
        cat_counts = {}
        for pet in self.pets:
            if pet.primary_cat_breed:
                id = pet.primary_cat_breed_id
                if id in cat_counts:
                    cat_counts[id] += 1
                else:
                    cat_counts[id] = 1
        if cat_counts:
            return max(cat_counts, key=lambda key: cat_counts[key])
        return None

    def photos(self):
        return {"small": self.photos_small, "full": self.photos_full}

    @classmethod
    @searchable_query(
        name,
        address1,
        address2,
        city,
        state,
        country,
        email,
        phone_number,
        mission,
        adoption_policy,
    )
    def query(cls):
        query = db.session.query(cls)
        max_dist = request_max_dist()
        if max_dist is None:
            return query

        user_loc = request_user_loc()
        query = query.filter(
            distance(user_loc, (Shelter.latitude, Shelter.longitude)) <= max_dist
        )
        if should_default_sort():
            query = query.order_by(
                distance(user_loc, (Shelter.latitude, Shelter.longitude))
            )

        return query


shelter_includes = ["id", "name", "mission", "adoption_policy"]
shelter_methods = [
    "address",
    "contact",
    "photos",
    "all_pets",
    "top_dog_breed_id",
    "top_cat_breed_id",
]


def setup_config(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


def apply_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


def setup(app):
    db.init_app(app)
    db.app = app

    def enable_cors(*_t, **_d):
        @after_this_request
        def apply_headers(response):
            return apply_cors_headers(response)

    preprocessors = {"GET_SINGLE": [enable_cors], "GET_MANY": [enable_cors]}

    manager = fr.APIManager(app, flask_sqlalchemy_db=db, preprocessors=preprocessors)

    manager.create_api(
        Pet,
        methods=["GET"],
        collection_name="pets",
        include_methods=pet_methods,
        include_columns=pet_includes,
        results_per_page=12,
    )

    manager.create_api(
        DogBreed,
        methods=["GET"],
        collection_name="dog_breeds",
        include_methods=dog_breed_methods,
        include_columns=dog_breed_includes,
        results_per_page=12,
    )

    manager.create_api(
        CatBreed,
        methods=["GET"],
        collection_name="cat_breeds",
        include_methods=cat_breed_methods,
        include_columns=cat_breed_includes,
        results_per_page=12,
    )

    manager.create_api(
        Shelter,
        methods=["GET"],
        collection_name="shelters",
        include_methods=shelter_methods,
        include_columns=shelter_includes,
        results_per_page=12,
    )

    @app.route("/api/filter")
    def filter_info():
        @after_this_request
        def apply_headers(response):
            return apply_cors_headers(response)

        def listify(c):
            return sorted(
                [i[0] for i in c if len(i) > 0 and i[0] is not None and i[0] != ""]
            )

        def itemify(c):
            c = list(c)
            if len(c):
                return c[0]
            return None

        def unique_letter(ul):
            return sorted(list(set([l[0].upper() for l in ul if len(l) > 0])))

        unique_dog_breeds = listify(db.session.query(DogBreed.name).distinct())
        unique_cat_breeds = listify(db.session.query(CatBreed.name).distinct())
        unique_colors = listify(db.session.query(Pet.color).distinct())
        unique_size = listify(db.session.query(Pet.size).distinct())
        unique_age = listify(db.session.query(Pet.age).distinct())
        # Dog Breeds
        unique_breed_groups = listify(db.session.query(DogBreed.breed_group).distinct())
        min_max_dog_life_span = itemify(
            db.session.query(
                func.min(DogBreed.life_span_low), func.max(DogBreed.life_span_high)
            )
        )
        min_max_height = itemify(
            db.session.query(
                func.min(DogBreed.height_imperial_low),
                func.max(DogBreed.height_imperial_high),
            )
        )
        min_max_weight = itemify(
            db.session.query(
                func.min(DogBreed.weight_imperial_low),
                func.max(DogBreed.weight_imperial_high),
            )
        )
        # Cat Breeds
        min_max_cat_life_span = itemify(
            db.session.query(
                func.min(CatBreed.life_span_low), func.max(CatBreed.life_span_high)
            )
        )
        # Shelters
        cities = listify(db.session.query(Shelter.city).distinct())
        states = listify(db.session.query(Shelter.state).distinct())
        max_num_pets = listify(
            db.session.query(func.count(Pet.id))
            .join(Pet, Shelter.pets)
            .group_by(Shelter.id)
            .all()
        )
        if len(max_num_pets):
            max_num_pets = max(max_num_pets)
        else:
            max_num_pets = None

        return jsonify(
            {
                "pets": {
                    "dog_breeds": unique_dog_breeds,
                    "cat_breeds": unique_cat_breeds,
                    "colors": unique_colors,
                    "sizes": unique_size,
                    "ages": unique_age,
                    "max_distance": 300,
                },
                "dog_breeds": {
                    "dog_breeds": unique_dog_breeds,
                    "unique_letters": unique_letter(unique_dog_breeds),
                    "breed_groups": unique_breed_groups,
                    "life_span": {
                        "min": min_max_dog_life_span[0],
                        "max": min_max_dog_life_span[1],
                    },
                    "height_span": {"min": min_max_height[0], "max": min_max_height[1]},
                    "weight_span": {"min": min_max_weight[0], "max": min_max_weight[1]},
                },
                "cat_breeds": {
                    "cat_breeds": unique_cat_breeds,
                    "unique_letters": unique_letter(unique_cat_breeds),
                    "life_span": {
                        "min": min_max_dog_life_span[0],
                        "max": min_max_dog_life_span[1],
                    },
                },
                "shelters": {
                    "cities": cities,
                    "states": states,
                    "num_pets": max_num_pets,
                },
            }
        )
