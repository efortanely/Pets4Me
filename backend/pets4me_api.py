import os
from flask import Flask
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY as Array
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
import flask_restless as fr
import refresh_service as rs

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Pet(db.Model):
    __tablename__ = 'pet'
    #Do not need to set--autogenerated
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    #Dog/Cat
    species = Column(String(10), nullable=False)
    #Male/Female
    gender = Column(String(20))

    #Do not need to set--autogenerated when dog_breed or cat_breed is assigned
    primary_dog_breed_id = Column(Integer, ForeignKey('dog_breed.id'))
    secondary_dog_breed_id = Column(Integer, ForeignKey('dog_breed.id'))
    primary_cat_breed_id = Column(Integer, ForeignKey('cat_breed.id'))
    secondary_cat_breed_id = Column(Integer, ForeignKey('cat_breed.id'))
    '''
    Pass a reference to a dog or cat breed object--this will require some
    searching over existing dog or cat breeds in table if the strings from
    the petfinder breed api aren't a perfect match
    '''
    primary_dog_breed = relationship('DogBreed', backref='dogs',
                                     foreign_keys=[primary_dog_breed_id])
    secondary_dog_breed = relationship('DogBreed', foreign_keys=[secondary_dog_breed_id])
    primary_cat_breed = relationship('CatBreed', backref='cats',
                                     foreign_keys=[primary_cat_breed_id])
    secondary_cat_breed = relationship('CatBreed', foreign_keys=[secondary_cat_breed_id])

    #Do not need to set--autogenerated when shelters is assigned
    shelter_id = Column(Integer, ForeignKey('shelter.id'))
    #Pass a reference to the shelter object
    shelter_ref = relationship('Shelter', back_populates='pets')

    size = Column(String(20))
    photos_small = Column(Array(String(500)))
    photos_full = Column(Array(String(500)))
    color = Column(String(50))
    age = Column(String(20))
    description = Column(String(5000))
    url = Column(String(500))

    #TODO calculate with shelter's address
    def distance(self):
        return None

    def primary_breed(self):
        if self.primary_dog_breed:
            id = self.primary_dog_breed_id
            name = self.primary_dog_breed.name
        elif self.primary_cat_breed:
            id = self.primary_cat_breed_id
            name = self.primary_cat_breed.name
        else:
            id = None
            name = None

        return {"id": id, "name": name}

    def secondary_breed(self):
        if self.secondary_dog_breed:
            id = self.secondary_dog_breed_id
            name = self.secondary_dog_breed.name
        elif self.secondary_cat_breed:
            id = self.secondary_cat_breed_id
            name = self.secondary_cat_breed.name
        else:
            id = None
            name = None

        return {"id": id, "name": name}

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

pet_includes = [
    'id', 'name', 'species', 'gender', 'size', 'color', 'age', 'description', 'url'
]
pet_methods = ['distance', 'primary_breed', 'secondary_breed', 'shelter', 'photos']

class DogBreed(db.Model):
    __tablename__ = 'dog_breed'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    temperament = Column(String(1000))
    life_span_low = Column(Integer)
    life_span_high = Column(Integer)
    height_imperial_low = Column(Integer)
    height_imperial_high = Column(Integer)
    weight_imperial_low = Column(Integer)
    weight_imperial_high = Column(Integer)
    bred_for = Column(String(100))
    breed_group = Column(String(100))

    #references to all dogs for breed, generated by setting dog_breed in pet instances
    #dogs = relationship('Pet', back_populates='primary_dog_breed')

    def life_span(self):
        return {"low": self.life_span_low, "high": self.life_span_high}

    def height_imperial(self):
        return {"low": self.height_imperial_low, "high": self.height_imperial_high}

    def weight_imperial(self):
        return {"low": self.weight_imperial_low, "high": self.weight_imperial_high}

    def dog_ids(self):
        return [dog.id for dog in self.dogs]

    #TODO call api to get local shelters
    def local_shelters_with_breed(self):
        shelters = Shelter.query.all()
        num_shelters = 20
        ct = 0
        ids = []
        for shelter in shelters:
            if num_shelters == len(ids):
                break
            for pet in shelter.pets:
                if pet.primary_dog_breed_id == self.id or pet.secondary_dog_breed_id == self.id:
                    ids.append(shelter.id)
                    ct += 1
                    break

        return ids

dog_breed_includes = ['id', 'name', 'temperament', 'bred_for', 'breed_group']
dog_breed_methods = [
    'life_span', 'height_imperial', 'weight_imperial', 'dog_ids', 'local_shelters_with_breed'
]

class CatBreed(db.Model):
    __tablename__ = 'cat_breed'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    alt_names = Column(Array(String(300)))
    temperament = Column(String(1000))
    life_span_low = Column(Integer)
    life_span_high = Column(Integer)
    #0-1
    indoor = Column(Integer)
    #1-5
    dog_friendly = Column(Integer)
    #1-5
    child_friendly = Column(Integer)
    #1-5
    grooming_level = Column(Integer)

    #references to all cats for breed, generated by setting cat_breed in pet instances
    #cats = relationship('Pet', back_populates='primary_cat_breed')

    def life_span(self):
        return {'low': self.life_span_low, 'high': self.life_span_high}

    def cat_ids(self):
        return [cat.id for cat in self.cats]

    #TODO call api to get local shelters
    def local_shelters_with_breed(self):
        shelters = Shelter.query.all()
        num_shelters = 20
        ct = 0
        ids = []
        for shelter in shelters:
            if num_shelters == len(ids):
                break
            for pet in shelter.pets:
                if pet.primary_cat_breed_id == self.id or pet.secondary_cat_breed_id == self.id:
                    ids.append(shelter.id)
                    ct += 1
                    break

        return ids

cat_breed_includes = [
    'id', 'name', 'alt_names', 'temperament', 'indoor',
    'dog_friendly', 'child_friendly', 'grooming_level'
]
cat_breed_methods = ['life_span', 'cat_ids', 'local_shelters_with_breed']

class Shelter(db.Model):
    __tablename__ = 'shelter'
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

    #references to all pets for shelters, generated by setting shelter in pet instances
    pets = relationship('Pet', back_populates='shelter_ref')

    #TODO calculate with address
    def distance(self):
        return None

    def address(self):
        return {
            'address1': self.address1,
            'address2': self.address2,
            'city': self.city,
            'state': self.state,
            'postcode': self.postcode,
            'country': self.country
        }

    def contact(self):
        return {'email': self.email, 'phone_number': self.phone_number}

    def all_pets(self):
        pets_dict = {}
        pet_num = 0

        for pet in self.pets:
            if pet.primary_dog_breed or pet.primary_cat_breed:
                pets_dict[pet_num] = {'species': pet.species, 'id': pet.id}
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

shelter_includes = ['id', 'name', 'mission', 'adoption_policy']
shelter_methods = [
    'distance', 'address', 'contact', 'photos', 'all_pets', 'top_dog_breed_id', 'top_cat_breed_id'
]

db.create_all()

manager = fr.APIManager(app, flask_sqlalchemy_db=db)

manager.create_api(
    Pet, methods=['GET'],
    collection_name='pets',
    include_methods=pet_methods,
    include_columns=pet_includes,
    results_per_page=12)

manager.create_api(
    DogBreed, methods=['GET'],
    collection_name='dog_breeds',
    include_methods=dog_breed_methods,
    include_columns=dog_breed_includes,
    results_per_page=12)

manager.create_api(
    CatBreed, methods=['GET'],
    collection_name='cat_breeds',
    include_methods=cat_breed_methods,
    include_columns=cat_breed_includes,
    results_per_page=12)

manager.create_api(
    Shelter, methods=['GET'],
    collection_name='shelters',
    include_methods=shelter_methods,
    include_columns=shelter_includes,
    results_per_page=12)

if __name__ == '__main__':
    rs.start(db)
    app.run(threaded=True, port=5000)
