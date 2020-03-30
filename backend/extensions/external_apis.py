import os
import re
import json
from oauthlib.oauth2 import BackendApplicationClient as BAC
from requests_oauthlib import OAuth2Session
import requests
from pixabay import Image
from .pets4me_api import Pet, DogBreed, CatBreed, Shelter

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

def parse_range(range_str):
    """
    This is a bit tricky: range_str might be one of the following
    4 - 6
    4 - 6 years
    4 - 6.5 years
    11 years
    something else...
    Therefore we take this fuzzy approach and hope for the best
    """

    # Match numbers not preceded by a dot or an integer to ignore decimals
    nums = [int(match.group(0)) for match in re.finditer(r"(?<![\.\d])\d+", range_str)]
    size = len(nums)
    if size == 0:
        return (None, None)
    if size == 1:
        # Just one number, replicate for both low and high
        return (nums[0], nums[0])
    # Ignore subsequent numbers
    return (nums[0], nums[1])

class DogAPI(CommonAPI):
    def __init__(self):
        super().__init__("https://api.thedogapi.com")

    def get_breeds(self):
        breeds_response = self.get("/v1/breeds")
        breeds_response_data = json.loads(breeds_response)
        image = Image(os.getenv("PIXABAY_API_KEY"))
        breeds = []

        for breed in breeds_response_data:
            name = breed.get("name", None)
            life_span_low, life_span_high = parse_range(breed.get("life_span", ""))
            height_imperial_low, height_imperial_high = parse_range(
                breed.get("height", {}).get("imperial", "")
            )
            weight_imperial_low, weight_imperial_high = parse_range(
                breed.get("weight", {}).get("imperial", "")
            )

            img = image.search(q=name,
                lang='en',
                image_type='photo',
                category='animals',
                safesearch='true',
                order='latest',
                page=1,
                per_page=3)

            try:
                url = img["hits"][0]["largeImageURL"]
            except:
                url = None

            new_breed = DogBreed(
                name=name,
                temperament=breed.get("temperament", None),
                life_span_low=life_span_low,
                life_span_high=life_span_high,
                height_imperial_low=height_imperial_low,
                height_imperial_high=height_imperial_high,
                weight_imperial_low=weight_imperial_low,
                weight_imperial_high=weight_imperial_high,
                bred_for=breed.get("bred_for", None),
                breed_group=breed.get("breed_group", None),
                photo=url
            )
            breeds.append(new_breed)
        return breeds

class CatAPI(CommonAPI):
    def __init__(self):
        super().__init__("https://api.thecatapi.com")

    def get_breeds(self):
        breeds_response = self.get("/v1/breeds")
        breeds_response_data = json.loads(breeds_response)
        image = Image(os.getenv("PIXABAY_API_KEY"))
        breeds = []

        for breed in breeds_response_data:
            name = breed.get("name", None)
            life_span_low, life_span_high = parse_range(breed.get("life_span", ""))
            
            img = image.search(q=name,
                lang='en',
                image_type='photo',
                orientation='horizontal',
                category='animals',
                safesearch='true',
                order='latest',
                page=1,
                per_page=3)

            try:
                url = img["hits"][0]["largeImageURL"]
            except:
                url = None

            new_breed = CatBreed(
                name=name,
                temperament=breed.get("temperament", None),
                life_span_low=life_span_low,
                life_span_high=life_span_high,
                # Input is comma-separated, split into list
                alt_names=[n for n in re.split(
                    r"\s*,\s*",
                    breed.get("alt_names", "")
                ) if len(n) > 0],
                indoor=breed.get("indoor", None),
                dog_friendly=breed.get("dog_friendly", None),
                child_friendly=breed.get("child_friendly", None),
                grooming_level=breed.get("grooming", None),
                photo=url
            )
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

def extract_photos(photos):
    if len(photos) == 0:
        return ([], [])
    small, full = zip(*((p.get("small", None), p.get("full", None)) for p in photos))
    return (list(small), list(full))

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
                         f"&location=76825&distance=500&{parameters}")
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
            if animal["type"] != "Cat" and animal["type"] != "Dog":
                continue
            photos_small, photos_full = extract_photos(animal.get("photos", []))
            new_animal = Pet(
                name=animal.get("name", None),
                species=animal.get("species", None),
                gender=animal.get("gender", None),
                # TODO: Find matching breed/shelter from other apis, requires some searching
                # MUST be done for Phase II
                primary_dog_breed=None,
                secondary_dog_breed=None,
                shelter_ref=None,
                size=animal.get("size", None),
                photos_small=photos_small,
                photos_full=photos_full,
                color=animal.get("colors", {}).get("primary", None),
                age=animal.get("age", None),
                description=animal.get("description", None),
                url=animal.get("url", None)
            )
            animals.append(new_animal)
        return animals

    def get_shelters(self, pages=1, limit=100):
        shelter_generator = self.get_paginated_data("organizations", pages=pages, limit=limit)
        shelters = []
        for shelter in shelter_generator:
            address = shelter.get("address", {})
            policy_dict = shelter.get("adoption", {})
            photos_small, photos_full = extract_photos(shelter.get("photos", []))
            new_shelter = Shelter(
                name=shelter.get("name", None),
                address1=address.get("address1", None),
                address2=address.get("address2", None),
                city=address.get("city", None),
                state=address.get("state", None),
                postcode=address.get("postcode", None),
                country=address.get("country", None),
                photos_small=photos_small,
                photos_full=photos_full,
                email=shelter.get("email", None),
                phone_number=shelter.get("phone", None),
                mission=shelter.get("mission_statement", None),
                adoption_policy=policy_dict.get("policy", policy_dict.get("url", None)),
            )
            shelters.append(new_shelter)
        return shelters