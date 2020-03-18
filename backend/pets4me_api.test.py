from pets4me_api import app
from unittest import main, TestCase

class MyUnitTests(TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_pet_status_code(self):
        response = self.app.get('/api/pets')
        self.assertEqual(response.status_code, 200)

    def test_dog_breed_status_code(self):
        response = self.app.get('/api/dog_breeds')
        self.assertEqual(response.status_code, 200)

    def test_cat_breed_status_code(self):
        response = self.app.get('/api/cat_breeds')
        self.assertEqual(response.status_code, 200)

    def test_shelter_status_code(self):
        response = self.app.get('/api/shelters')
        self.assertEqual(response.status_code, 200)

if __name__ == "__main__":
    main()