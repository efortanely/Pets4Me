from flask_apscheduler import APScheduler
from .external_apis import PetAPI, DogAPI, CatAPI
from .pets4me_api import db

scheduler = APScheduler()


def commit_all(iterable):
    for e in iterable:
        db.session.add(e)
    db.session.commit()


def refresh():
    with db.app.app_context():
        print("Refreshing...")
        db.drop_all()
        db.create_all()

        print("Connecting...")
        dog_api = DogAPI()
        cat_api = CatAPI()
        pet_api = PetAPI()

        print("Getting dog breeds...")
        commit_all(dog_api.get_breeds())
        dog_breeds_map, new_breeds = pet_api.get_dog_breeds(dog_api)
        commit_all(new_breeds)

        print("Getting cat breeds...")
        commit_all(cat_api.get_breeds())
        cat_breeds_map, new_breeds = pet_api.get_cat_breeds(cat_api)
        commit_all(new_breeds)

        print("Getting pets and shelters...")
        commit_all(pet_api.get_animals(dog_breeds_map, cat_breeds_map, pages=10))
        # Getting pets already gives us 201 shelters
        # We can leave this out for now
        # commit_all(pet_api.get_shelters(pages=10))
        dog_api.close()
        cat_api.close()
        pet_api.close()
        print("Refresh complete.")


def setup_config(app):
    app.config["JOBS"] = [
        {"id": "refresh-service", "func": refresh, "trigger": "interval", "days": 1}
    ]
    app.config["SCHEDULER_EXECUTORS"] = {
        "default": {"type": "processpool", "max_workers": 1}
    }
    app.config["SCHEDULER_API_ENABLED"] = False


def setup(app):
    scheduler.init_app(app)
    scheduler.start()
