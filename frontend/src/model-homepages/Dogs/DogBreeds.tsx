import React from 'react';
import DogBreedsFilters from './DogBreedsFilters'
import '../ModelHomepage.css';
import DogBreedsInfoCards from './DogBreedsInfoCards';
import { DogBreedsFiltersData, dogSampleFilterData } from '../../models/DogBreedsFiltersData'
import Spinner from "react-bootstrap/Spinner";
import Pets4meApiService from '../../common/services/Pets4meApiService';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

interface DogBreedsState {
  filterString: string,
  filterOptions: DogBreedsFiltersData, 
  loading: boolean
}

export class DogBreeds extends React.Component<RouteComponentProps, DogBreedsState> {

  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      filterString: '',
      filterOptions: dogSampleFilterData,
      loading: true
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.state.filterOptions.updateFilters = this.handleFilterUpdate;
  }

  componentDidMount() {
    let apiService = new Pets4meApiService();
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    apiService.getFilterOptions()
        .then((response: any) => {
          let filtersData: DogBreedsFiltersData = {
            breed_group: response.dog_breeds.breed_groups,
            breeds: response.dog_breeds.dog_breeds,
            name_initials: response.dog_breeds.unique_letters,
            max_height: response.dog_breeds.height_span.max,
            min_height: response.dog_breeds.height_span.min,
            max_weight: response.dog_breeds.weight_span.max,
            min_weight: response.dog_breeds.weight_span.min,
            lifespan_max: response.dog_breeds.life_span.max,
            lifespan_min: response.dog_breeds.life_span.min,
            updateFilters: this.handleFilterUpdate
          }
          this.setState({filterOptions: filtersData, loading: false});
        })
        .catch(console.log)
  }

  public handleFilterUpdate(filters: string): void {
    this.setState({filterString: filters});
  }

  render() {
    return (
      <div className='model-homepage'>
            <Container fluid id='mainContent'>
              <Row>
                <Col bsPrefix="col-static col-fill">
                  {this.state.loading ? <div className='filters'><Spinner animation='border'></Spinner></div> :
                    <DogBreedsFilters {...this.state.filterOptions}/> }
                </Col>
                <Col className='cards-container'  bsPrefix="col-custom-10 col-fill">
                  <DogBreedsInfoCards {...this.props} filterString={this.state.filterString} />
                </Col>
              </Row>
            </Container>
      </div>
    );
  }
} export default DogBreeds;
