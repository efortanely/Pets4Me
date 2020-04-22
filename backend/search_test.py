from unittest import main, TestCase
from test_app import app
from extensions.pets4me_api import Pet, DogBreed, CatBreed, Shelter, db
import json
import time


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

            doxin = DogBreed(
                name="Doxin",
                temperament=[
                    "Dumb",
                    "Carefree",
                    "Uncaring",
                    "Depressing",
                    "Boring",
                    "Timid",
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
                alt_names=["Domestic Shorthair", "Stuartkind", "Cool Name 1"],
                indoor=0,
                dog_friendly=5,
                child_friendly=4,
                grooming_level=1,
            )

            longhair = CatBreed(
                name="American Longhair",
                temperament="Lazy, Unintrested, Hard Going, Boring, Mad",
                life_span_low=15,
                life_span_high=17,
                alt_names=["Domestic Longhair", "Silly Name 1", "Silly Name 2"],
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

            db.session.add(doxin)
            db.session.add(longhair)
            db.session.add(stuart)
            db.session.add(huey)
            db.session.commit()

    """ Pets Tests """

    # author Robert
    def test_pet_none(self):
        response = self.app.get("/api/pets?search=UNREAL")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 0)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 0)

    # author Robert
    def test_pet_one(self):
        response = self.app.get("/api/pets?search=  BlAcK")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 1)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 1)
        stuart = response["objects"][0]
        self.assertEqual(stuart.get("name", None), "Stuart")

    # author Robert
    def test_pet_both(self):
        response = self.app.get("/api/pets?search=my Male mAILed my ale")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 2)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 2)

    """ Cat Breed Tests """

    # author Robert
    def test_cat_breed_none(self):
        response = self.app.get("/api/cat_breeds?search=UNREAL%")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 0)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 0)

    # author Robert
    def test_cat_breed_one(self):
        response = self.app.get("/api/cat_breeds?search=Looooooooooong Long")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 1)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 1)
        longhair = response["objects"][0]
        self.assertEqual(longhair.get("name", None), "American Longhair")

    # author Robert
    def test_cat_breed_both(self):
        response = self.app.get("/api/cat_breeds?search=Going Going Going Gooooooone")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 2)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 2)

    # author Robert
    def test_cat_breed_array1(self):
        response = self.app.get("/api/cat_breeds?search=stuart")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 1, str(response))
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 1)
        shorthair = response["objects"][0]
        self.assertEqual(longhair.get("name", None), "American Shorthair")

    # author Robert
    def test_cat_breed_array2(self):
        response = self.app.get("/api/cat_breeds?search=silly boi")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 1, str(response))
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 1)
        longhair = response["objects"][0]
        self.assertEqual(longhair.get("name", None), "American Longhair")

    # author Robert
    def test_cat_breed_array3(self):
        response = self.app.get("/api/cat_breeds?search=domestic")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 2, str(response))
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 2)

    """ Dog Breed Tests """

    # author Robert
    def test_dog_breed_none(self):
        response = self.app.get("/api/dog_breeds?search=UNREAL%")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 0)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 0)

    # author Robert
    def test_dog_breed_one(self):
        response = self.app.get("/api/dog_breeds?search=Doxin")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 1)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 1)
        doxin = response["objects"][0]
        self.assertEqual(doxin.get("name", None), "Doxin")

    # author Robert
    def test_dog_breed_both(self):
        response = self.app.get("/api/dog_breeds?search=Rabbit")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 2)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 2)

    """ Shelter Tests """

    # author Robert
    def test_shelter_none(self):
        response = self.app.get("/api/shelters?search=animal\\%")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 0)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 0)

    # author Robert
    def test_shelter_one(self):
        response = self.app.get("/api/shelters?search=TX XT meeeee plsss")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 1)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 1)
        tx = response["objects"][0]
        self.assertEqual(tx.get("address", {}).get("state", None), "TX")

    # author Robert
    def test_shelter_both(self):
        response = self.app.get("/api/shelters?search=animal animal galore")
        self.assertEqual(response.status_code, 200)
        response = json.loads(response.data)
        self.assertEqual(response.get("num_results", None), 2)
        self.assertIn("objects", response)
        self.assertEqual(len(response["objects"]), 2)


if __name__ == "__main__":
    main()
