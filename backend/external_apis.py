import os
import json
from oauthlib.oauth2 import BackendApplicationClient as BAC
from requests_oauthlib import OAuth2Session
import requests

class CommonAPI:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()

    def close(self):
        self.session.close()

    def get(self, url):
        return self.get_raw(url).text

    def get_raw(self, url):
        return self.session.get(self.base_url + url)

class DogAPI(CommonAPI):
    def __init__(self):
        super().__init__("https://api.thedogapi.com")

    def get_breeds(self):
        breeds_response = self.get("/v1/breeds")
        breeds_response_data = json.loads(breeds_response)
        breeds = []
        for breed in breeds_response_data:
            new_breed = {
                'id': breed.get('id', None),
                'name': breed.get('name', None),
                'temperament': breed.get('temperament', None),
                'life_span': breed.get('life_span', None),
                'height': breed.get('height', {}).get('imperial', None),
                'weight': breed.get('weight', {}).get('imperial', None),
                'bred_for': breed.get('bred_for', None),
                'breed_group': breed.get('breed_group', None)
            }
            breeds.append(new_breed)
        return breeds

class CatAPI(CommonAPI):
    def __init__(self):
        super().__init__("https://api.thecatapi.com")

    def get_breeds(self):
        breeds_response = self.get("/v1/breeds")
        breeds_response_data = json.loads(breeds_response)
        breeds = []
        for breed in breeds_response_data:
            new_breed = {
                'id': breed.get('id', None),
                'name': breed.get('name', None),
                'alt_names': breed.get('alt_names', None),
                'temperament': breed.get('temperament', None),
                'life_span': breed.get('life_span', None),
                'indoor': bool(breed.get('indoor', False)),
                'dog_friendly': breed.get('dog_friendly', None),
                'child_friendly': breed.get('child_friendly', None),
                'grooming_level': breed.get('grooming', None),
            }
            breeds.append(new_breed)
        return breeds

class OAuthAPI:
    def __init__(self, key, secret, base_url, token_url):
        self.base_url = base_url
        client = BAC(client_id=key)
        self.oauth = OAuth2Session(client=client)
        self.oauth.fetch_token(token_url=base_url + token_url, client_secret=secret, client_id=key)

    def close(self):
        self.oauth.close()

    def get(self, url):
        return self.get_raw(url).text

    def get_raw(self, url):
        return self.oauth.get(self.base_url + url)

class PetAPI(OAuthAPI):
    def __init__(self):
        key = "NpG2i5NuwSKUaMBNcYeQGacuYoeDxQvDfXPouK4lAAneSJyJEA"
        secret = os.getenv("PF_API_SECRET")
        super().__init__(key, secret, base_url="https://api.petfinder.com",
                         token_url="/v2/oauth2/token")

    def get_paginated_data(self, endpoint, parameters="", pages=1, limit=100):
        total_pages = None
        for page in range(1, pages + 1):
            # this is a circle that includes most of Texas (as much as we can get)
            response = json.loads(
                self.get(f"/v2/{endpoint}?page={page}&limit={limit}"
                         + "&location=76825&distance=500&{parameters}")
            )
            if total_pages is None:
                total_pages = response["pagination"]["total_pages"]
            if page > total_pages:
                break
            for datum in response[endpoint]:
                yield datum

    def get_animals(self, pages=1, limit=100):
        animal_generator = self.get_paginated_data("animals", pages=pages, limit=limit)
        animals = []
        for animal in animal_generator:
            if animal['type'] != "Cat" and animal['type'] != "Dog":
                continue
            new_animal = {
                'id': animal.get('id', None),
                'name': animal.get('name', None),
                'species': animal.get('species', None),
                'gender': animal.get('gender', None),
                'breeds': animal.get('breeds', None),
                'contact': animal.get('contact', None),
                'size': animal.get('size', None),
                'photos': animal.get('photos', []),
                'colors': animal.get('colors', None),
                'age': animal.get('age', None),
                'description': animal.get('description', None),
                'link': animal.get('url', None)
            }
            animals.append(new_animal)
        return animals

    def get_shelters(self, pages=1, limit=100):
        shelter_generator = self.get_paginated_data("organizations", pages=pages, limit=limit)
        shelters = []
        for shelter in shelter_generator:
            new_shelter = {
                'id': shelter.get('id', None),
                'name': shelter.get('name', None),
                'address': shelter.get('address', None),
                'phone': shelter.get('phone', None),
                'email': shelter.get('email', None),
                'mission': shelter.get('mission_statement', None),
                'policy': shelter.get('adoption', None),
                'distance': shelter.get('distance', None)
            }
            shelters.append(new_shelter)
        return shelters
