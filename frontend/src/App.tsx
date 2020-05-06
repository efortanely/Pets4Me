import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Pets from "./model-homepages/Pets/Pets";
import DogBreeds from "./model-homepages/Dogs/DogBreeds";
import CatBreeds from "./model-homepages/Cats/CatBreeds";
import Shelters from "./model-homepages/Shelters/Shelters";
import Navbar from "./common/components/Navbar";
import DogBreedInstancePage from "./model-instancepages/Breeds/DogBreedInstancePage";
import PetInstancePage from "./model-instancepages/Pets/PetInstancePage";
import CatBreedInstancePage from "./model-instancepages/Breeds/CatBreedInstancePage";
import ShelterInstancePage from "./model-instancepages/Shelters/ShelterInstancePage";
import SearchResults from "./Search/SearchResults";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/pets/:pet_id" component={PetInstancePage} />
          <Route path="/pets" component={Pets} />
          <Route
            path="/dog-breeds/:breed_id"
            component={DogBreedInstancePage}
          />
          <Route path="/dog-breeds" component={DogBreeds} />
          <Route
            path="/cat-breeds/:breed_id"
            component={CatBreedInstancePage}
          />
          <Route path="/cat-breeds" component={CatBreeds} />
          <Route path="/shelters/:shelter_id" component={ShelterInstancePage} />
          <Route path="/shelters" component={Shelters} />
          <Route path="/about" component={About} />
          <Route path="/search-results" component={SearchResults} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
