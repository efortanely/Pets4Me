# pets4me
Our goal is to make finding a new furry friend as easy as possible. Explore the best fit for your lifestyle with our dog and cat breed search engine, or jump right into discovering pets at your local shelters.

## Members
* Andrew Cramer
    * EID: ac49725
    * Gitlab ID: acramer
    * Estimated Time to Completion: 21 hrs
    * Actual Time to Completion: 24 hrs


* Rosemary Fortanely 
    * EID: emf2283
    * Gitlab ID: codesmary
    * Estimated Time to Completion: 15 hrs
    * Actual Time to Completion: 20 hrs


* Connor Sheehan 
    * EID: cps2255
    * Gitlab ID: connor6321
    * Estimated Time to Completion: 20 hrs
    * Actual Time to Completion: 20 hrs


* Dean Torkelson
    * EID: dt24566
    * Gitlab ID: deantorkelson
    * Estimated Time to Completion: 15 hrs
    * Actual Time to Completion: 21 hrs


* Cristan Garza
    * EID: cg42574
    * Gitlab ID: CristianGarza
    * Estimated Time to Completion: 16 hrs
    * Actual Time to Completion: 22 hrs


* Robert Hrusecky
    * EID: reh3279
    * Gitlab ID: robert-hrusecky
    * Estimated Time to Completion: 15 hrs
    * Actual Time to Completion: 23 hrs

Git SHA: 51cf2d0f190c77fb9e403d3491eb2bab83c183f4

Phase One Project Leader: Connor Sheehan

[API Docs](https://documenter.getpostman.com/view/3840765/SzKYQcyE?version=latest)

[Website](https://www.pets4.me)

## Frontend

### First time setup

Make sure you have Node v13.9.0

It is recommended to use *nvm* to install Node:
https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/

Now all you need to do to set up the project is run

`npm install --user`

from the `frontend` directory.

### Running

Make sure you are in the `frontend` directory.

To run the development server use `npm run dev`.

To run the production optimized server, first build:

`npm run build`

Then start the server:

`PORT=8080 npm start`

### Deploying

Setup the [gloud sdk](https://cloud.google.com/sdk/docs)

Generate the production optimized server with `npm run build`

From the `frontend` directory, run `./deploy.sh` with the API_KEY environment
variable set, or use `./deploy -k <API_KEY>`

## Backend

### First time setup

For local development, we are using `venv`. If you're running Ubuntu, make sure you've installed it:

`sudo apt install python3-venv`

Next, change into the `backend` directory.

Run `update_dependencies.sh` to create a virtual environment with the required dependencies.
Run `source env/bin/activate` to enter the virtual environment.
Run `deactivate` from within the environment to leave it.

### Deploying

Setup the [gloud sdk](https://cloud.google.com/sdk/docs)

From the `backend` directory, run `./deploy.sh`. You will need to have various
environment variables set on your machine which will be copied to GCP. These
appear in the array `ENV_VARS` at the top of `deploy.sh`. To add a new
environment variable, simply add it to this space-separated array.
