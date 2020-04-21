import React from 'react';
import CatBreedsFilters from './CatBreedsFilters'
import '../ModelHomepage.css';
import CatBreedsInfoCards from './CatBreedsInfoCards';
import MediaQuery from 'react-responsive';
import { CatBreedsFiltersData, catSampleFilterData } from '../../models/CatBreedsFiltersData';
import Spinner from "react-bootstrap/Spinner";
import Pets4meApiService from '../../common/services/Pets4meApiService';
import { RouteComponentProps } from 'react-router-dom';

interface CatBreedsState {
  filterString: string,
  filterOptions: CatBreedsFiltersData, 
  loading: boolean
}

export class CatBreeds extends React.Component<RouteComponentProps, CatBreedsState> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      filterString: '',
      filterOptions: catSampleFilterData,
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
          let filtersData: CatBreedsFiltersData = {
            breeds: response.cat_breeds.cat_breeds,
            name_initials: response.cat_breeds.unique_letters,
            lifespan_max: response.cat_breeds.life_span.max,
            lifespan_min: response.cat_breeds.life_span.min,
            updateFilters: this.handleFilterUpdate
          }
          this.setState({filterOptions: filtersData, loading: false});
        })
        .catch(console.log)
  }

  render() {
    return (
      <div className='model-homepage'>
        <MediaQuery query="(max-width: 1349px)">
          <div className='model-homepage-content'>
            {this.state.loading ? <Spinner animation='border'></Spinner> : <CatBreedsFilters {...this.state.filterOptions}/> } 
            <CatBreedsInfoCards {...this.props} filterString={this.state.filterString}/>
          </div>
        </MediaQuery>

        <MediaQuery query="(min-width: 1350px)">
          <div className='model-homepage-content'>
          {this.state.loading ? <Spinner animation='border'></Spinner> : <CatBreedsFilters {...this.state.filterOptions}/> }
            <div className='model-homepage-content-col'>
              <div className='cards-container'>
                <CatBreedsInfoCards {...this.props} filterString={this.state.filterString}/>
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
} export default CatBreeds;
