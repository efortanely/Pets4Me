import React from 'react';
import CatBreedsFilters from './CatBreedsFilters'
import '../ModelHomepage.css';
import CatBreedsInfoCards from './CatBreedsInfoCards';
import { CatBreedsFilterOptions } from '../../models/CatBreedsFilterOptions';
import Spinner from "react-bootstrap/Spinner";
import { RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import FilterOptionsService from '../../common/services/FiltersService';
import { Pets4meCatBreedsFilterOptionsService } from '../../common/services/Pets4MeFiltersService';

interface CatBreedsState {
  filterString: string,
  filterOptions: CatBreedsFilterOptions, 
  loading: boolean
}

interface CatBreedsProviders { catBreedsFilterOptionsService: FilterOptionsService<CatBreedsFilterOptions> }

export class CatBreeds extends React.Component<RouteComponentProps, CatBreedsState> {
  static providers: CatBreedsProviders = { catBreedsFilterOptionsService: Pets4meCatBreedsFilterOptionsService }
  
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      filterString: '',
      filterOptions: { } as CatBreedsFilterOptions,
      loading: true
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
  }

  public handleFilterUpdate(filters: string): void {
    this.setState({filterString: filters});
  }

  componentDidMount() {
    let catBreedsFilterOptionsService = CatBreeds.providers.catBreedsFilterOptionsService
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    catBreedsFilterOptionsService.getFilterOptions()
        .then((response: any) => {
          response.updateFilters = this.handleFilterUpdate
          this.setState({filterOptions: response, loading: false});
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
