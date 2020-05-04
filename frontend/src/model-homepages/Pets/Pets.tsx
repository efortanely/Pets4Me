import React from 'react';
import PetsFilters from './PetsFilters';
import '../ModelHomepage.css';
import PetsInfoCards from './PetsInfoCards';
import Spinner from "react-bootstrap/Spinner";
import { PetsFilterOptions } from '../../models/PetsFilterOptions'
import { RouteComponentProps } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { Pets4mePetsFilterOptionsService } from '../../common/services/Pets4MeFiltersService';
import FilterOptionsService from '../../common/services/FiltersService';

interface PetsState {
  filterString: string,
  filterOptions: PetsFilterOptions, 
  loading: boolean
}
interface PetsProviders { filterOptionsService: FilterOptionsService<PetsFilterOptions> }

export class Pets extends React.Component<RouteComponentProps, PetsState> {
  static providers: PetsProviders = { filterOptionsService: Pets4mePetsFilterOptionsService }

  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      filterString: '',
      filterOptions: {} as PetsFilterOptions,
      loading: true
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
  }

  public handleFilterUpdate(filters: string): void {
    this.setState({filterString: filters});
  }

  componentDidMount() {
    const filterOptionsService: FilterOptionsService<PetsFilterOptions> = Pets.providers.filterOptionsService
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    filterOptionsService.getFilterOptions()
    .then((response: PetsFilterOptions) => {
      response.updateFilters = this.handleFilterUpdate
      this.setState({filterOptions: response, loading: false});
    })
    .catch(console.log)
  }

  render() {
    return (
      <div className='model-homepage' id='mainContent'>
        <Container fluid>
          <Row className="model-homepage-row">
            <Col bsPrefix="col-static col-fill">
              {this.state.loading ? <div className='filters'><Spinner animation='border'></Spinner></div> :
                <PetsFilters {...this.state.filterOptions}/> }
            </Col>
            <Col className='cards-container'  bsPrefix="col-custom-10 col-fill">
              <PetsInfoCards {...this.props} filterString={this.state.filterString} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
} export default Pets;
