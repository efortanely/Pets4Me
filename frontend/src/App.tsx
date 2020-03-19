import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home/Home'
import About from './About/About'
import Pets from './model-homepages/Pets/Pets'
import DogBreeds from './model-homepages/Dogs/DogBreeds'
import CatBreeds from './model-homepages/Cats/CatBreeds'
import Shelters from './model-homepages/Shelters/Shelters'
import Navbar from './common/components/Navbar'
import TomHanks from './model-instancepages/Pets/TomHanks'
import FunGuy from './model-instancepages/Pets/FunGuy'
import Pegasus19 from './model-instancepages/Pets/Pegasus19'
import Chihuahua from './model-instancepages/Breeds/Chihuahua'
import StaffBullTerrier from './model-instancepages/Breeds/StaffBullTerrier'
import DomesticShorthair from './model-instancepages/Breeds/DomesticShorthair'
import AnimalCenter from './model-instancepages/Shelters/AnimalCenter'
import AustinPetsAlive from './model-instancepages/Shelters/AustinPetsAlive'
import HumaneSociety from './model-instancepages/Shelters/HumaneSociety'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/pets/tom-hanks">
            <TomHanks />
          </Route>
          <Route path="/pets/fun-guy">
            <FunGuy />
          </Route>
          <Route path="/pets/pegasus-19">
            <Pegasus19 />
          </Route>
          <Route path="/pets">
            <Pets />
          </Route>
          <Route path="/dog-breeds/chihuahua">
            <Chihuahua />
          </Route>
          <Route path="/dog-breeds/staffordshire">
            <StaffBullTerrier />
          </Route>
          <Route path="/dog-breeds">
            <DogBreeds />
          </Route>
          <Route path="/cat-breeds/domestic-shorthair">
            <DomesticShorthair />
          </Route>
          <Route path="/cat-breeds">
            <CatBreeds />
          </Route>
          <Route path="/shelters/austin-humane-society">
            <HumaneSociety />
          </Route>
          <Route path="/shelters/austin-pets-alive">
            <AustinPetsAlive />
          </Route>
          <Route path="/shelters/austin-animal-center">
            <AnimalCenter />
          </Route>
          <Route path="/shelters">
            <Shelters />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
