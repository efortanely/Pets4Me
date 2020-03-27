from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ProcessPoolExecutor
from external_apis import PetAPI, DogAPI, CatAPI

def add_all(db, iterable):
    for e in iterable:
        db.session.add(e)

def refresh(db):
    print("Refreshing...")
    db.drop_all()
    db.create_all()

    dog_api = DogAPI()
    dog_breeds = dog_api.get_breeds()
    dog_api.close()
    add_all(db, dog_breeds)
    del dog_breeds

    cat_api = CatAPI()
    cat_breeds = cat_api.get_breeds()
    cat_api.close()
    add_all(db, cat_breeds)
    del cat_breeds

    pet_api = PetAPI()
    shelters = pet_api.get_shelters(pages=10)
    pets = pet_api.get_animals(pages=10)
    pet_api.close()
    add_all(db, shelters)
    add_all(db, pets)

    db.session.commit()


def start(db):
    # Call it once on startup
    refresh(db)
    # Schedule subsequent runs for 1-day intervals
    scheduler = BackgroundScheduler(executors={"default": ProcessPoolExecutor(1)})
    scheduler.add_job(lambda: refresh(db), 'interval', days=1)
    scheduler.start()
