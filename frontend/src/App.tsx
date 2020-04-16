import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home/Home'
import About from './About/About'
import Pets from './model-homepages/Pets/Pets'
import DogBreeds from './model-homepages/Dogs/DogBreeds'
import CatBreeds from './model-homepages/Cats/CatBreeds'
import Shelters from './model-homepages/Shelters/Shelters'
import Navbar from './common/components/Navbar'
import DogBreedInstancePage from './model-instancepages/Breeds/DogBreedInstancePage'
import PetInstancePage from './model-instancepages/Pets/PetInstancePage'
import CatBreedInstancePage from './model-instancepages/Breeds/CatBreedInstancePage'
import ShelterInstancePage from './model-instancepages/Shelters/ShelterInstancePage'
import Pets4meApiService from './common/services/Pets4meApiService'
import FilterData from './sampleFilterOptions.json'
import './App.css';
import { PetsFiltersData } from './models/PetsFiltersData';
import { DogBreedsFiltersData } from './models/DogBreedsFiltersData';
import { CatBreedsFiltersData } from './models/CatBreedsFiltersData';
import { SheltersFiltersData } from './models/SheltersFiltersData';

class App extends React.Component<{}, {}> {

  componentDidMount() {
    let apiService = new Pets4meApiService();
    // apiService.getFilterOptions()
    //     .then(console.log)
    //     .catch(console.log)
    this.setState({filterData: FilterData})
    console.log(FilterData);
  }

  parsePetFilterOptions(apiData: any): PetsFiltersData {
    return {
      ages: apiData.pets.ages,
      catBreeds: apiData.pets.cat_breeds,
      colors: apiData.pets.colors,
      dogBreeds: apiData.pets.dog_breeds,
      max_distance: apiData.pets.max_distance,
      sizes: apiData.pets.sizes,
      updateFilters: (arg: any) => console.log("Filter callback not set!")
    };
  }

  parseDogBreedsFilterOptions(apiData: any): DogBreedsFiltersData {
    return {
      breed_group: apiData.dog_breeds.breed_groups,
      breeds: apiData.dog_breeds.dog_breeds,
      name_initials: apiData.dog_breeds.unique_letters,
      max_height: apiData.dog_breeds.height_span.max,
      min_height: apiData.dog_breeds.height_span.min,
      max_weight: apiData.dog_breeds.weight_span.max,
      min_weight: apiData.dog_breeds.weight_span.min,
      lifespan_max: apiData.dog_breeds.life_span.max,
      lifespan_min: apiData.dog_breeds.life_span.min,
      updateFilters: (arg: any) => console.log("Filter callback not set!")
    };
  }

  parseCatBreedsFilterOptions(apiData: any): CatBreedsFiltersData {
    return {
      breeds: apiData.cat_breeds.cat_breeds,
      name_initials: apiData.cat_breeds.unique_letters,
      lifespan_max: apiData.cat_breeds.life_span.max,
      lifespan_min: apiData.cat_breeds.life_span.min,
      updateFilters: (arg: any) => console.log("Filter callback not set!")
    };
  }

  parseShelterFilterOptions(apiData: any): SheltersFiltersData {
    return {
      cities: apiData.shelters.cities,
      states: apiData.shelters.states,
      max_pets: apiData.shelters.num_pets,
      max_distance: 600,
      updateFilters: (arg: any) => console.log("Filter callback not set!")
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route path="/pets/:pet_id" component={PetInstancePage} />
            <Route path="/pets">
              <Pets filterOptions={this.parsePetFilterOptions(FilterData)}/>
            </Route>
            <Route path="/dog-breeds/:breed_id" component={DogBreedInstancePage} />
            <Route path="/dog-breeds">
              <DogBreeds filterOptions={this.parseDogBreedsFilterOptions(FilterData)}/>
            </Route>
            <Route path="/cat-breeds/:breed_id" component={CatBreedInstancePage} />
            <Route path="/cat-breeds">
              <CatBreeds filterOptions={this.parseCatBreedsFilterOptions(FilterData)}/>
            </Route>
            <Route path="/shelters/:shelter_id" component={ShelterInstancePage} />
            <Route path="/shelters">
              <Shelters filterOptions={this.parseShelterFilterOptions(FilterData)}/>
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
}

export default App;
