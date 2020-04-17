import React from 'react';
import PetsFilters from './PetsFilters';
import MediaQuery from 'react-responsive';
import '../ModelHomepage.css';
import PetsInfoCards from './PetsInfoCards';
import Pets4meApiService from '../../common/services/Pets4meApiService'
import Spinner from "react-bootstrap/Spinner";
import { PetsFiltersData, petSampleFilterData } from '../../models/PetsFiltersData'

interface PetsState {
  filterString: string,
  filterOptions: PetsFiltersData, 
  loading: boolean
}

export class Pets extends React.Component<{}, PetsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      filterString: '',
      filterOptions: petSampleFilterData,
      loading: true
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
  }

  public handleFilterUpdate(filters: string): void {
    this.setState({filterString: filters});
  }

  componentDidMount() {
    let apiService = new Pets4meApiService();
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    apiService.getFilterOptions()
        .then((response: any) => {
          let filtersData: PetsFiltersData = {
            ages: response.pets.ages,
            catBreeds: response.pets.cat_breeds,
            colors: response.pets.colors,
            dogBreeds: response.pets.dog_breeds,
            max_distance: response.pets.max_distance,
            sizes: response.pets.sizes,
            updateFilters: this.handleFilterUpdate
          }
          this.setState({filterOptions: filtersData, loading: false});
        })
        .catch(console.log)
  }

  render() {
    return (
      <div className='model-homepage'>
        <MediaQuery query="(max-width: 949px)">
          <div className='model-homepage-content'>
            {this.state.loading ? <Spinner animation='border'></Spinner> :<PetsFilters {...this.state.filterOptions}/> }
            <div className='cards-container'>
              <PetsInfoCards filterString={this.state.filterString}/>
            </div>
          </div>
        </MediaQuery>

        <MediaQuery query="(min-width: 950px)">
          <div className='model-homepage-content'>
          {this.state.loading ? <Spinner animation='border'></Spinner> :<PetsFilters {...this.state.filterOptions}/> }
            <div className='model-homepage-content-col'>
              <div className='cards-container'>
                <PetsInfoCards filterString={this.state.filterString}/>
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
} export default Pets;
