# pets4me
Our goal is to make finding a new furry friend as easy as possible. Explore the best fit for your lifestyle with our dog and cat breed search engine, or jump right into discovering pets at your local shelters.

## Members
* Andrew Cramer
    * EID: ac49725
    * Gitlab ID: acramer
    * Estimated Time to Completion: 30 hrs
    * Actual Time to Completion: 31 hrs


* Rosemary Fortanely 
    * EID: emf2283
    * Gitlab ID: codesmary
    * Estimated Time to Completion: 30 hrs
    * Actual Time to Completion: 44 hrs


* Connor Sheehan 
    * EID: cps2255
    * Gitlab ID: connor6321
    * Estimated Time to Completion: 30 hrs
    * Actual Time to Completion: 34 hrs


* Dean Torkelson
    * EID: dt24566
    * Gitlab ID: deantorkelson
    * Estimated Time to Completion: 30 hrs
    * Actual Time to Completion: 33 hrs


* Cristan Garza
    * EID: cg42574
    * Gitlab ID: CristianGarza
    * Estimated Time to Completion: 30 hrs
    * Actual Time to Completion: 30 hrs


* Robert Hrusecky
    * EID: reh3279
    * Gitlab ID: robert-hrusecky
    * Estimated Time to Completion: 30 hrs
    * Actual Time to Completion:35 hrs

Git SHA: 8808b921b316f708c6cd909c9d97cd955aec6f66

Phase One Project Leader: Connor Sheehan
Phase Two Project Leader: Dean Torkelson
Phase Three Project Leader: Rosemary Fortanely

[API Docs](https://documenter.getpostman.com/view/10430017/SzYYzJDX?version=latest)

[Website](https://www.pets4.me)

[Pipelines](https://gitlab.com/acramer/pets4me/pipelines)

Tests:
    Frontend tests are in frontend/src/test/*.spec.tsx files
    Selenium tests are in frontend/src/test/guitest.tsx
    Postman tests are in backend/postman_api_test.json
    Backend tests are in backend/extensions/*_test.py files

## Overall Setup

### Secret repo (shhhhh...)

Clone our [secret repo](https://gitlab.com/robert-hrusecky/pets4me-secret/) in
a directory right beside (outside, not inside) this one. This repo is private
and contains API keys and other information that we legally cannot publish. A
few scripts expect that the repository is in this location and that the folder
is named `pets4me-secret`.

### Docker

Install [docker](https://docs.docker.com/engine/install/ubuntu/). 
Be sure and follow these
[post installation steps](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user)
in order to be able to run docker as a non-root user. Otherwise, you will need
to use `sudo make` for any make target that runs docker (they usually look like
`d...`).

## Frontend

### First time setup

Make sure you have Node v13.9.0

It is recommended to use *nvm* to install Node:
https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/

Now all you need to do to set up the project is run

`make update`

from the `frontend` directory.

### Running

Make sure you are in the `frontend` directory.

To run the development server use `make run`. This will attempt to connect to a
locally running backend server. Use `make run-remote` to connect to the
published backend.

To run the production optimized server, first build:

`make build`

Then start the server:

`make run-prod`

### Testing

`npm run s-test` for smoke testing
Use `make test` to run postman tests as well.

### Deploying

Setup the [gloud sdk](https://cloud.google.com/sdk/docs)

Generate the production optimized server with `make build`

From the `frontend` directory, run `gcloud app deploy` 

### Docker

If for some reason you don't want to install node/npm on your system but you
want to run the frontend anyways, you can use docker. Most of the `make`
targets have `d...` versions that run the corresponding command in a temporary
node docker container.  For example, we have `make dupdate` and `make drun`.

## Backend

### First time setup

For local development, we are using `venv`. If you're running Ubuntu, make sure
you've installed it (if you're not using docker):

`sudo apt install python3-venv`

Next, change into the `backend` directory.

Run `make update` to create a virtual environment with the required dependencies.
Run `source env/bin/activate` to enter the virtual environment.
Run `deactivate` from within the environment to leave it.

Or if you're using docker, run `make dupdate`.

### Running with docker

First, create a container with a local database running in the background using
`make dcreate`. If you want a container that points at the public database, use
`make dcreate-remote`.

Now that you've got a database running, you can open a bash shell in the
container if you need to poke around for debugging. To do this run `make
dattach`. To detach, just type `exit`.

If you want to populate the local database, run `make drefresh` to trigger a
manual database refresh. Alternatively, you can use `make dnew` do both create
a container and populate the local database in one command.

To run the backend server, use `make drun`. This will point to either your
local database or a remote database depending your use of `make dcreate` vs
`make dcreate-remote`. You can use `Ctrl-C` to kill the server.

You can delete the container by using `make drm` or `make clean`. There is no
need to re-create a container every time you want to run the backend. You can
run `make drun` as many times as you want.

### Testing with docker

Use `make dtest`. This uses a container you created with make `make dcreate`
etc. Do __NOT__ use `make dcreate-remote`, or you'll end up wiping the real
database and putting our garbage test data in it instead.

### Formatting

Use `make fmt` or `make dfmt`.

### Deploying

Setup the [gloud sdk](https://cloud.google.com/sdk/docs)

From the `backend` directory, run `./deploy.sh`. You will need to have various
environment variables set on your machine which will be copied to GCP. These
appear in the array `ENV_VARS` at the top of `deploy.sh`. To add a new
environment variable, simply add it to this space-separated array.
