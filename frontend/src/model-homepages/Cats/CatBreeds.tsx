import React from 'react';
import CatBreedsFilters from './CatBreedsFilters'
import '../ModelHomepage.css';
import CatBreedsInfoCards from './CatBreedsInfoCards';
import { CatBreedsFiltersData, catSampleFilterData } from '../../models/CatBreedsFiltersData';
import Spinner from "react-bootstrap/Spinner";
import Pets4meApiService from '../../common/services/Pets4meApiService';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

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
        <Container fluid id='mainContent'>
          <Row>
            <Col bsPrefix="col-static col-fill">
              {this.state.loading ? <div className='filters'><Spinner animation='border'></Spinner></div> :
                <CatBreedsFilters {...this.state.filterOptions}/> }
            </Col>
            <Col className='cards-container'  bsPrefix="col-custom-10 col-fill">
              <CatBreedsInfoCards {...this.props} filterString={this.state.filterString} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
} export default CatBreeds;
