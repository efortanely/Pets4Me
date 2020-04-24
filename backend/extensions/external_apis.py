import os
import re
import json
import time
from oauthlib.oauth2 import BackendApplicationClient as BAC
from requests_oauthlib import OAuth2Session
import requests
from util.sql import escape_like
import pgeocode
import sys
from youtube_search import YoutubeSearch
from .pets4me_api import Pet, DogBreed, CatBreed, Shelter, db


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

    def parse_dog_breed(self, breed):
        name = breed.get("name", None)
        life_span_low, life_span_high = parse_range(breed.get("life_span", ""))
        height_imperial_low, height_imperial_high = parse_range(
            breed.get("height", {}).get("imperial", "")
        )
        weight_imperial_low, weight_imperial_high = parse_range(
            breed.get("weight", {}).get("imperial", "")
        )

        results = json.loads(YoutubeSearch(name + " Dogs 101", max_results=1).to_json())
        if len(results["videos"]):
            video_url = "https://youtube.com" + results["videos"][0]["link"]
        else:
            video_url = None

        return DogBreed(
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
            photo=self.get_photo(breed.get("id", None)),
            video_url=video_url,
        )

    def get_photo(self, breed_id):
        try:
            url = json.loads(self.get(f"/v1/images/search?breed_ids={breed_id}"))[0][
                "url"
            ]
            return url
        except:
            return None

    def find_breed(self, query):
        result = json.loads(self.get(f"/v1/breeds/search?q={query}"))
        return self.parse_dog_breed(result[0]) if len(result) > 0 else None

    def get_breeds(self):
        breeds_response = self.get("/v1/breeds")
        breeds_response_data = json.loads(breeds_response)
        breeds = []

        for breed in breeds_response_data:
            breeds.append(self.parse_dog_breed(breed))
        return breeds


class CatAPI(CommonAPI):
    def __init__(self):
        super().__init__("https://api.thecatapi.com")

    def parse_cat_breed(self, breed):
        name = breed.get("name", None)
        life_span_low, life_span_high = parse_range(breed.get("life_span", ""))

        results = json.loads(YoutubeSearch(name + " Cats 101", max_results=1).to_json())
        if len(results["videos"]):
            video_url = "https://youtube.com" + results["videos"][0]["link"]
        else:
            video_url = None

        return CatBreed(
            name=name,
            temperament=breed.get("temperament", None),
            life_span_low=life_span_low,
            life_span_high=life_span_high,
            # Input is comma-separated, split into list
            alt_names=[
                n
                for n in re.split(r"\s*,\s*", breed.get("alt_names", ""))
                if len(n) > 0
            ],
            indoor=breed.get("indoor", None),
            dog_friendly=breed.get("dog_friendly", None),
            child_friendly=breed.get("child_friendly", None),
            grooming_level=breed.get("grooming", None),
            photo=self.get_photo(breed.get("id", None)),
            video_url=video_url,
        )

    def get_photo(self, breed_id):
        try:
            url = json.loads(self.get(f"/v1/images/search?breed_ids={breed_id}"))[0][
                "url"
            ]
            return url
        except:
            return None

    def find_breed(self, query):
        result = json.loads(self.get(f"/v1/breeds/search?q={query}"))
        return self.parse_cat_breed(result[0]) if len(result) > 0 else None

    def get_breeds(self):
        breeds_response = self.get("/v1/breeds")
        breeds_response_data = json.loads(breeds_response)
        breeds = []

        for breed in breeds_response_data:
            breeds.append(self.parse_cat_breed(breed))
        return breeds


class OAuthAPI:
    def __init__(self, key, secret, base_url, token_url):
        self.base_url = base_url
        client = BAC(client_id=key)
        self.oauth = OAuth2Session(client=client)
        self.oauth.fetch_token(
            token_url=base_url + token_url, client_secret=secret, client_id=key
        )

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


def parse_pet(animal, shelter, dog_breed_map, cat_breed_map):
    photos_small, photos_full = extract_photos(animal.get("photos", []))

    primary_dog_breed = None
    secondary_dog_breed = None
    primary_cat_breed = None
    secondary_cat_breed = None
    primary_str = None
    secondary_str = None

    breeds_str_dict = animal.get("breeds", None)
    if breeds_str_dict is not None:
        primary_str = breeds_str_dict.get("primary", None)
        secondary_str = breeds_str_dict.get("secondary", None)
        if animal["type"] == "Dog":
            if primary_str is not None:
                primary_dog_breed = dog_breed_map[primary_str]
            if secondary_str is not None:
                secondary_dog_breed = dog_breed_map[secondary_str]
        else:
            if primary_str is not None:
                primary_cat_breed = cat_breed_map[primary_str]
            if secondary_str is not None:
                secondary_cat_breed = cat_breed_map[secondary_str]

    return Pet(
        name=animal.get("name", None),
        species=animal.get("species", None),
        gender=animal.get("gender", None),
        primary_dog_breed=primary_dog_breed,
        secondary_dog_breed=secondary_dog_breed,
        primary_cat_breed=primary_cat_breed,
        secondary_cat_breed=secondary_cat_breed,
        primary_fallback_breed=primary_str,
        secondary_fallback_breed=secondary_str,
        shelter_ref=shelter,
        size=animal.get("size", None),
        photos_small=photos_small,
        photos_full=photos_full,
        color=animal.get("colors", {}).get("primary", None),
        age=animal.get("age", None),
        description=animal.get("description", None),
        url=animal.get("url", None),
    )


def parse_shelter(shelter, nomi):
    address = shelter.get("address", {})
    policy_dict = shelter.get("adoption", {})
    photos_small, photos_full = extract_photos(shelter.get("photos", []))
    postcode = address.get("postcode", None)

    if postcode:
        geo_data = nomi.query_postal_code(postcode)
        latitude = geo_data["latitude"]
        longitude = geo_data["longitude"]
    else:
        # default to GDC
        latitude = 30.286
        longitude = -97.736

    return Shelter(
        name=shelter.get("name", None),
        address1=address.get("address1", None),
        address2=address.get("address2", None),
        city=address.get("city", None),
        state=address.get("state", None),
        postcode=postcode,
        country=address.get("country", None),
        photos_small=photos_small,
        photos_full=photos_full,
        email=shelter.get("email", None),
        phone_number=shelter.get("phone", None),
        mission=shelter.get("mission_statement", None),
        adoption_policy=policy_dict.get("policy", policy_dict.get("url", None)),
        latitude=latitude,
        longitude=longitude,
        has_cats=0,
        has_dogs=0,
    )


class PetAPI(OAuthAPI):
    def __init__(self):
        key = "yDkGT4TvLZLzYpK9RGFCx9QaVUertzN66AX24DyViQ0Pw5XbN6"
        secret = os.environ["PF_API_SECRET"]
        super().__init__(
            key,
            secret,
            base_url="https://api.petfinder.com",
            token_url="/v2/oauth2/token",
        )
        self.shelter_cache = {}
        self.reset_requests()
        self.nomi = pgeocode.Nominatim("us")

    def reset_requests(self):
        self.requests = 0
        self.last_time = time.time()

    def get_raw(self, url):
        # Rate limiting logic
        now = time.time()
        delta = now - self.last_time
        if delta >= 1:
            self.reset_requests()
        elif delta > 0.5 and self.requests / delta > 30:
            print("sleep")
            time.sleep(1 - delta)
            self.reset_requests()
        self.requests += 1
        return super().get_raw(url)

    def get_paginated_data(self, endpoint, pages=1, limit=100, **parameters):
        total_pages = None
        param_query = ""
        for key, val in parameters.items():
            param_query += f"&{key}={val}"

        for page in range(1, pages + 1):
            response = json.loads(
                self.get(f"/v2/{endpoint}?page={page}&limit={limit}" f"{param_query}")
            )
            if "status" in response and response["status"] != 200:
                sys.exit("Error: " + response["title"])
            if total_pages is None:
                total_pages = response["pagination"]["total_pages"]
            if page > total_pages:
                break
            for datum in response[endpoint]:
                yield datum

    def get_dog_breeds(self, dog_api):
        breed_map = {}
        new_breeds = []
        response = json.loads(self.get("/v2/types/Dog/breeds"))
        if "status" in response and response["status"] != 200:
            sys.exit("Error: " + response["title"])

        for b in response["breeds"]:
            if "name" not in b:
                continue
            long_breed = b["name"]
            breed = None
            for breed_str in re.split(r"\s*[/\\]\s*", long_breed):
                breed = (
                    db.session.query(DogBreed)
                    .filter(DogBreed.name.ilike(escape_like(breed_str), escape="\\"))
                    .first()
                )
                if breed is not None:
                    break

                breed = dog_api.find_breed(breed_str)
                if breed is not None:
                    new_breeds.append(breed)
                    break

            breed_map[long_breed] = breed

        return (breed_map, new_breeds)

    def get_cat_breeds(self, cat_api):
        breed_map = {}
        new_breeds = []
        response = json.loads(self.get("/v2/types/Cat/breeds"))
        if "status" in response and response["status"] != 200:
            sys.exit("Error: " + response["title"])

        for b in response["breeds"]:
            if "name" not in b:
                continue
            long_breed = b["name"]
            breed = None
            for breed_str in re.split(r"\s*[/\\]\s*", long_breed):
                breed = (
                    db.session.query(CatBreed)
                    .filter(CatBreed.name.ilike(escape_like(breed_str), escape="\\"))
                    .first()
                )
                if breed is not None:
                    break

                for word in re.split(r"\s+", breed_str):
                    if word.lower() in ["american", "domestic"]:
                        continue
                    escaped = escape_like(breed_str)
                    breed = (
                        db.session.query(CatBreed)
                        .filter(CatBreed.name.ilike(f"%{escaped}%", escape="\\"))
                        .first()
                    )
                    if breed is not None:
                        break
                if breed is not None:
                    break

                breed = cat_api.find_breed(breed_str)
                if breed is not None:
                    new_breeds.append(breed)
                    break

            breed_map[long_breed] = breed

        return (breed_map, new_breeds)

    def get_animals(self, dog_breed_map, cat_breed_map, pages=1, limit=100):
        animal_generator = self.get_paginated_data(
            "animals", pages=pages, limit=limit, location="76825", distance=278
        )
        animals = []
        for animal in animal_generator:
            if animal["type"] != "Cat" and animal["type"] != "Dog":
                continue
            pf_id = animal.get("organization_id", None)
            if pf_id:
                shelter = self.get_shelter(pf_id)
                if shelter.has_cats == 0 and animal["type"] == "Cat":
                    shelter.has_cats = 1
                elif shelter.has_dogs == 0 and animal["type"] == "Dog":
                    shelter.has_dogs = 1
            else:
                shelter = None
            animals.append(parse_pet(animal, shelter, dog_breed_map, cat_breed_map))
        return animals

    def get_shelter(self, pf_id):
        if pf_id not in self.shelter_cache:
            response = json.loads(self.get(f"/v2/organizations/{pf_id}"))
            if "status" in response and response["status"] != 200:
                sys.exit("Error: " + response["title"])

            self.shelter_cache[pf_id] = parse_shelter(
                response["organization"], self.nomi
            )

        return self.shelter_cache[pf_id]

    def get_shelters(self, pages=1, limit=100):
        shelter_generator = self.get_paginated_data(
            "organizations", pages=pages, limit=limit, location="76825", distance=278
        )
        shelters = []
        for shelter in shelter_generator:
            shelters.append(parse_shelter(shelter, self.nomi))
        return shelters
