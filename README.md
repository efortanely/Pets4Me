# pets4me
Our goal is to make finding a new furry friend as easy as possible. Explore the best fit for your lifestyle with our dog and cat breed search engine, or jump right into discovering pets at your local shelters.

## Members
* Andrew Cramer
    * EID: ac49725
    * Gitlab ID: acramer
    * Estimated Time to Completion: 21 hrs


* Rosemary Fortanely 
    * EID: emf2283
    * Gitlab ID: codesmary
    * Estimated Time to Completion: 15 hrs


* Connor Sheehan 
    * EID: cps2255
    * Gitlab ID: connor6321
    * Estimated Time to Completion: 20 hrs


* Dean Torkelson
    * EID: dt24566
    * Gitlab ID: deantorkelson
    * Estimated Time to Completion: 15 hrs


* Cristan Garza
    * EID: cg42574
    * Gitlab ID: CristianGarza
    * Estimated Time to Completion: 16 hrs


* Robert Hrusecky
    * EID: reh3279
    * Gitlab ID: robert-hrusecky
    * Estimated Time to Completion: 15 hrs

Git SHA: d9c543e5b3685c830509f820be9cd2ad39a66b2f

Phase One Project Leader: Connor Sheehan

API Doc: https://documenter.getpostman.com/view/3840765/SzKYQcyE?version=latest

Website: https://www.pets4.me
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

from the `frontend` directory, run `./deploy.sh` with the API_KEY environment
variable set, or use `./deploy -k <API_KEY>`
