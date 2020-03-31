from flask import Flask
from extensions import pets4me_api, refresh_service


def create_app(name):
    app = Flask(name)
    # Setup config
    pets4me_api.setup_config(app)
    refresh_service.setup_config(app)
    # Setup extensions
    pets4me_api.setup(app)
    refresh_service.setup(app)

    return app
