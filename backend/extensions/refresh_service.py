from flask_apscheduler import APScheduler
from .external_apis import PetAPI, DogAPI, CatAPI
from .pets4me_api import db

scheduler = APScheduler()

def add_all(iterable):
    for e in iterable:
        db.session.add(e)

def refresh():
    print("Refreshing...")
    with db.app.app_context():
        db.drop_all()
        db.create_all()

        dog_api = DogAPI()
        dog_breeds = dog_api.get_breeds()
        dog_api.close()
        add_all(dog_breeds)
        del dog_breeds

        cat_api = CatAPI()
        cat_breeds = cat_api.get_breeds()
        cat_api.close()
        add_all(cat_breeds)
        del cat_breeds

        pet_api = PetAPI()
        shelters = pet_api.get_shelters(pages=10)
        pets = pet_api.get_animals(pages=10)
        pet_api.close()
        add_all(shelters)
        add_all(pets)

        db.session.commit()
    print("Refresh complete.")

def setup_config(app):
    app.config['JOBS'] = [
        {
            'id': 'refresh-service',
            'func': refresh,
            'trigger': 'interval',
            'days': 1
        }
    ]
    app.config['SCHEDULER_EXECUTORS'] = {
        'default': {'type': 'processpool', 'max_workers': 1}
    }
    app.config['SCHEDULER_API_ENABLED'] = False

def setup(app):
    scheduler.init_app(app)
    scheduler.start()
