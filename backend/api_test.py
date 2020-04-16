from unittest import main, TestCase
from app import create_app
from extensions.pets4me_api import Pet, DogBreed, CatBreed, Shelter, db
import json
import time

app = create_app("test_app")


class MyUnitTests(TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        with app.app_context():
            db.drop_all()
            db.create_all()

            shelter1 = Shelter(
                name="L.A. County Animal Care Control: Agoura",
                address1="29525 Agoura Road",
                city="Agoura",
                state="CA",
                postcode=91301,
                country="US",
                photos="https://photos.petfinder.com/photos/organizations/124/1/?bust=1546042081",
                email="no-reply@petfinder.com",
                phone_number="555-555-5555",
                latitude=34.143,
                longitude=-118.763,
                has_cats=0,
                has_dogs=1,
            )

            shelter2 = Shelter(
                name="L.A. County Animal Care Control: Agoura",
                address1="FM 1960 Rd. East #71",
                city="Humble",
                state="TX",
                postcode=77346,
                country="US",
                email="adopt@ctdr.org",
                latitude=29.991,
                longitude=-95.171,
                has_cats=1,
                has_dogs=0,
            )

            dachshund = DogBreed(
                name="Dachshund",
                temperament=[
                    "Clever",
                    "Stubborn",
                    "Devoted",
                    "Lively",
                    "Playful",
                    "Courageous",
                ],
                life_span_low=12,
                life_span_high=15,
                height_imperial_low=8,
                height_imperial_high=9,
                weight_imperial_low=11,
                weight_imperial_high=32,
                bred_for="Rabbit hunting",
                breed_group="Hound",
            )

            shorthair = CatBreed(
                name="American Shorthair",
                temperament="Active, Curious, Easy Going, Playful, Calm",
                life_span_low=15,
                life_span_high=17,
                alt_names=["Domestic Shorthair"],
                indoor=0,
                dog_friendly=5,
                child_friendly=4,
                grooming_level=1,
            )

            huey = Pet(
                name="Huey",
                species="Dog",
                gender="Male",
                primary_dog_breed=dachshund,
                shelter_ref=shelter2,
                size="Small",
                color="Tan",
                age="Young",
                description=None,
                url=None,
            )

            stuart = Pet(
                name="Stuart",
                species="Cat",
                gender="Male",
                primary_cat_breed=shorthair,
                shelter_ref=shelter1,
                size="Medium",
                color="Black",
                age="Young",
            )

            db.session.add(stuart)
            db.session.add(huey)
            db.session.commit()

    """ Pets Tests """

    # author Rosemary
    def test_pet_status_code(self):
        response = self.app.get("/api/pets")
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_pet_json(self):
        valid_pet_json = True
        response = self.app.get("/api/pets")
        pet_json = json.loads(response.data)
        total_pages = pet_json["total_pages"] + 1

        for page in range(total_pages):
            response = self.app.get(f"/api/pets?page={page}")
            for pet in json.loads(response.data)["objects"]:
                valid_pet_json &= (
                    "id" in pet
                    and "name" in pet
                    and "species" in pet
                    and "gender" in pet
                    and "size" in pet
                    and "color" in pet
                    and "age" in pet
                    and "description" in pet
                    and "url" in pet
                    and "primary_breed" in pet
                    and "secondary_breed" in pet
                    and "shelter" in pet
                    and "photos" in pet
                )

        self.assertTrue(valid_pet_json)

    # author Rosemary
    def test_pet_time(self):
        t = time.time()
        response = self.app.get("/api/pets")
        self.assertLessEqual(time.time() - t, 0.1)

    # author Rosemary
    def test_pet_distance(self):
        response_all = self.app.get("/api/pets")
        response = self.app.get("/api/pets?zip_code=78705&max_dist=200")
        num_pets_all = json.loads(response_all.data)["num_results"]
        num_pets = json.loads(response.data)["num_results"]
        self.assertTrue(num_pets_all > num_pets > 0)

    # author Rosemary
    def test_pet_filters_dog(self):
        response = self.app.get(
            '/api/pets?q={"filters":[\
        {"name":"species","op":"==","val":"Dog"},\
        {"name":"gender","op":"==","val":"Female"},\
        {"name":"color","op":"==","val":"Brown / Chocolate"},\
        {"name":"size","op":"==","val":"Small"},\
        {"name":"age","op":"==","val":"Baby"},\
        {"name":"primary_dog_breed","op":"has","val":{"name":"name","op":"eq","val":"Cocker Spaniel"}},\
        {"name":"secondary_dog_breed","op":"has","val":{"name":"name","op":"eq","val":"Dachshund"}}]}'
        )
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_pet_filters_cat(self):
        response = self.app.get(
            '/api/pets?q={"filters":[\
        {"name":"species","op":"==","val":"Cat"},\
        {"name":"gender","op":"==","val":"Male"},\
        {"name":"color","op":"==","val":"White / Cream"},\
        {"name":"size","op":"==","val":"Medium"},\
        {"name":"age","op":"==","val":"Senior"},\
        {"name":"primary_cat_breed","op":"has","val":{"name":"name","op":"eq","val":"American Shorthair"}},\
        {"name":"secondary_cat_breed","op":"has","val":{"name":"name","op":"eq","val":"Snowshoe"}}]}'
        )
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_pet_sort(self):
        response = self.app.get(
            '/api/pets?q={"order_by":[\
        {"field":"species","direction":"asc"},\
        {"field":"gender","direction":"desc"},\
        {"field":"color","direction":"asc"},\
        {"field":"size","direction":"desc"},\
        {"field":"age","direction":"asc"}]}'
        )
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_pet_sort_primary_dog_breed(self):
        response = self.app.get("/api/pets?sort=primary_dog_breed&dir=asc")
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_pet_sort_secondary_dog_breed(self):
        response = self.app.get("/api/pets?sort=secondary_dog_breed&dir=desc")
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_pet_sort_primary_cat_breed(self):
        response = self.app.get("/api/pets?sort=primary_cat_breed&dir=asc")
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_pet_sort_secondary_cat_breed(self):
        response = self.app.get("/api/pets?sort=secondary_cat_breed&dir=desc")
        self.assertEqual(response.status_code, 200)

    """ Dog Breeds Tests """

    # author Rosemary
    def test_dog_breed_status_code(self):
        response = self.app.get("/api/dog_breeds")
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_dog_breeds_json(self):
        valid_dog_breeds_json = True
        response = self.app.get("/api/dog_breeds")
        dog_breeds_json = json.loads(response.data)
        total_pages = dog_breeds_json["total_pages"] + 1

        for page in range(total_pages):
            response = self.app.get(f"/api/dog_breeds?page={page}")
            for dog_breed in json.loads(response.data)["objects"]:
                valid_dog_breeds_json &= (
                    "id" in dog_breed
                    and "name" in dog_breed
                    and "temperament" in dog_breed
                    and "bred_for" in dog_breed
                    and "breed_group" in dog_breed
                    and "photo" in dog_breed
                    and "life_span" in dog_breed
                    and "height_imperial" in dog_breed
                    and "weight_imperial" in dog_breed
                    and "shelters_with_breed" in dog_breed
                )

        self.assertTrue(valid_dog_breeds_json)

    # author Rosemary
    def test_dog_breed_time(self):
        t = time.time()
        response = self.app.get("/api/dog_breeds")
        self.assertLessEqual(time.time() - t, 0.1)

    # author Rosemary
    def test_dog_breed_filters(self):
        response = self.app.get(
            '/api/dog_breeds?q={"filters":[\
        {"name":"name","op":"==","val":"Affenpinscher"},\
        {"name":"breed_group","op":"==","val":"Toy"},\
        {"name":"life_span_low","op":"==","val":10},\
        {"name":"life_span_high","op":"==","val":13},\
        {"name":"height_imperial_low","op":"==","val":10},\
        {"name":"height_imperial_high","op":"==","val":12},\
        {"name":"weight_imperial_low","op":"==","val":6},\
        {"name":"weight_imperial_high","op":"==","val":13}]}'
        )
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_dog_breed_sort(self):
        response = self.app.get(
            '/api/dog_breeds?q={"order_by":[\
        {"field":"name","direction":"asc"},\
        {"field":"breed_group","direction":"desc"},\
        {"field":"life_span_low","direction":"asc"},\
        {"field":"life_span_high","direction":"desc"},\
        {"field":"height_imperial_low","direction":"asc"},\
        {"field":"height_imperial_high","direction":"desc"},\
        {"field":"weight_imperial_low","direction":"asc"},\
        {"field":"weight_imperial_high","direction":"desc"}]}'
        )
        self.assertEqual(response.status_code, 200)

    """ Cat Breeds Tests """

    # author Rosemary
    def test_cat_breed_status_code(self):
        response = self.app.get("/api/cat_breeds")
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_cat_breeds_json(self):
        valid_cat_breeds_json = True
        response = self.app.get("/api/cat_breeds")
        cat_breeds_json = json.loads(response.data)
        total_pages = cat_breeds_json["total_pages"] + 1

        for page in range(total_pages):
            response = self.app.get(f"/api/cat_breeds?page={page}")
            for cat_breed in json.loads(response.data)["objects"]:
                valid_cat_breeds_json &= (
                    "id" in cat_breed
                    and "name" in cat_breed
                    and "alt_names" in cat_breed
                    and "temperament" in cat_breed
                    and "indoor" in cat_breed
                    and "dog_friendly" in cat_breed
                    and "child_friendly" in cat_breed
                    and "grooming_level" in cat_breed
                    and "photo" in cat_breed
                    and "life_span" in cat_breed
                    and "cat_ids" in cat_breed
                    and "shelters_with_breed" in cat_breed
                )

        self.assertTrue(valid_cat_breeds_json)

    # author Rosemary
    def test_cat_breed_time(self):
        t = time.time()
        response = self.app.get("/api/cat_breeds")
        self.assertLessEqual(time.time() - t, 0.1)

    # author Rosemary
    def test_cat_breed_filters(self):
        response = self.app.get(
            '/api/cat_breeds?q={"filters":[\
        {"name":"name","op":"==","val":"Abyssinian"},\
        {"name":"indoor","op":"==","val":0},\
        {"name":"dog_friendly","op":"==","val":4},\
        {"name":"child_friendly","op":"==","val":3},\
        {"name":"grooming_level","op":"==","val":1},\
        {"name":"life_span_low","op":"==","val":14},\
        {"name":"life_span_high","op":"==","val":15}]}'
        )
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_cat_breed_sort(self):
        response = self.app.get(
            '/api/cat_breeds?q={"order_by":[\
        {"field":"name","direction":"asc"},\
        {"field":"indoor","direction":"desc"},\
        {"field":"dog_friendly","direction":"asc"},\
        {"field":"child_friendly","direction":"desc"},\
        {"field":"grooming_level","direction":"asc"},\
        {"field":"life_span_low","direction":"desc"},\
        {"field":"life_span_high","direction":"asc"}]}'
        )
        self.assertEqual(response.status_code, 200)

    """ Shelters Tests """

    # author Rosemary
    def test_shelter_status_code(self):
        response = self.app.get("/api/shelters")
        self.assertEqual(response.status_code, 200)

    # author Andrew 
    def test_shelter_status_code(self):
        response = self.app.get("/api/filter")
        self.assertEqual(response.status_code, 200)
        
    # author Rosemary
    def test_shelter_json(self):
        valid_shelters_json = True
        response = self.app.get("/api/shelters")
        shelters_json = json.loads(response.data)
        total_pages = shelters_json["total_pages"] + 1

        for page in range(total_pages):
            response = self.app.get(f"/api/shelters?page={page}")
            for shelter in json.loads(response.data)["objects"]:
                valid_shelters_json &= (
                    "id" in shelter
                    and "name" in shelter
                    and "mission" in shelter
                    and "adoption_policy" in shelter
                    and "address" in shelter
                    and "contact" in shelter
                    and "photos" in shelter
                    and "all_pets" in shelter
                    and "top_dog_breed_id" in shelter
                    and "top_cat_breed_id" in shelter
                )

        self.assertTrue(valid_shelters_json)

    # author Rosemary
    def test_shelter_time(self):
        t = time.time()
        response = self.app.get("/api/shelters")
        self.assertLessEqual(time.time() - t, 0.1)

    # author Rosemary
    def test_shelter_distance(self):
        response_all = self.app.get("/api/shelters")
        response = self.app.get("/api/shelters?zip_code=78705&max_dist=200")
        num_shelters_all = json.loads(response_all.data)["num_results"]
        num_shelters = json.loads(response.data)["num_results"]
        self.assertTrue(num_shelters_all > num_shelters > 0)

    # author Rosemary
    def test_shelter_filters(self):
        response = self.app.get(
            '/api/shelters?q={"filters":[\
        {"name":"city","op":"==","val":"Richardson"},\
        {"name":"postcode","op":"==","val":75080},\
        {"name":"state","op":"==","val":"TX"},\
        {"name":"has_cats","op":"==","val":0},\
        {"name":"has_dogs","op":"==","val":1}]}'
        )
        self.assertEqual(response.status_code, 200)

    # author Rosemary
    def test_shelter_sort(self):
        response = self.app.get(
            '/api/shelters?q={"order_by":[\
        {"field":"city","direction":"asc"},\
        {"field":"postcode","direction":"desc"},\
        {"field":"state","direction":"asc"},\
        {"field":"has_cats","direction":"desc"},\
        {"field":"has_dogs","direction":"asc"}]}'
        )
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    main()
