from unittest import main, TestCase
from .external_apis import DogAPI, CatAPI, PetAPI


class ExternalApisTest(TestCase):
    def petfinder_check_endpoint(self, endpoint):
        pet_api = PetAPI()
        response = pet_api.get_raw(f"/v2/{endpoint}")
        self.assertEqual(200, response.status_code)
        pet_api.close()

    # author Robert
    def test_petfinder_pets_liveness(self):
        self.petfinder_check_endpoint("animals")

    # author Robert
    def test_petfinder_shelters_liveness(self):
        self.petfinder_check_endpoint("organizations")

    # author Robert
    def test_dogapi_liveness(self):
        dog_api = DogAPI()
        response = dog_api.get_raw("/v1/breeds")
        self.assertEqual(200, response.status_code)
        dog_api.close()

    # author Robert
    def test_catapi_liveness(self):
        cat_api = CatAPI()
        response = cat_api.get_raw("/v1/breeds")
        self.assertEqual(200, response.status_code)
        cat_api.close()


if __name__ == "__main__":  # pragma: no cover
    main()
