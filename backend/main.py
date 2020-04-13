from argparse import ArgumentParser
from app import create_app
from extensions import refresh_service

parser = ArgumentParser()
parser.add_argument(
    "-r",
    "--refresh",
    action="store_true",
    help="When specified, the backend server is not started. Instead, a full database refresh is performed.",
)
args = parser.parse_args()

app = create_app(__name__)

if __name__ == "__main__":
    if args.refresh:
        refresh_service.refresh()
    else:
        app.run(host="0.0.0.0", threaded=True, port=5000)
