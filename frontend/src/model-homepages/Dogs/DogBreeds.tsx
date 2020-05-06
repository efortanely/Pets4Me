import React from "react";
import DogBreedsFilters from "./DogBreedsFilters";
import "../ModelHomepage.css";
import DogBreedsInfoCards from "./DogBreedsInfoCards";
import { DogBreedsFilterOptions } from "../../models/DogBreedsFilterOptions";
import { RouteComponentProps } from "react-router-dom";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import FilterOptionsService from "../../common/services/FiltersService";
import { Pets4meDogBreedsFilterOptionsService } from "../../common/services/Pets4MeFiltersService";

interface DogBreedsState {
  filterString: string;
  filterOptions: DogBreedsFilterOptions;
  loading: boolean;
}
interface DogBreedsProviders {
  dogBreedsFilterOptionsService: FilterOptionsService<DogBreedsFilterOptions>;
}

export class DogBreeds extends React.Component<
  RouteComponentProps,
  DogBreedsState
> {
  static providers: DogBreedsProviders = {
    dogBreedsFilterOptionsService: Pets4meDogBreedsFilterOptionsService,
  };
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      filterString: "",
      filterOptions: {} as DogBreedsFilterOptions,
      loading: true,
    };
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
  }

  componentDidMount() {
    let filterOptionsService: FilterOptionsService<DogBreedsFilterOptions> =
      DogBreeds.providers.dogBreedsFilterOptionsService;
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    filterOptionsService
      .getFilterOptions()
      .then((response: any) => {
        response.updateFilters = this.handleFilterUpdate;
        this.setState({ filterOptions: response, loading: false });
      })
      .catch(console.log);
  }

  public handleFilterUpdate(filters: string): void {
    this.setState({ filterString: filters });
  }

  render() {
    return (
      <div className="model-homepage">
        <Container fluid id="mainContent">
          <Row className="model-homepage-row">
            <Col bsPrefix="col-static col-fill">
              {this.state.loading ? (
                <div className="filters">
                  <Spinner animation="border"></Spinner>
                </div>
              ) : (
                <DogBreedsFilters {...this.state.filterOptions} />
              )}
            </Col>
            <Col className="cards-container" bsPrefix="col-custom-10 col-fill">
              <DogBreedsInfoCards
                {...this.props}
                filterString={this.state.filterString}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default DogBreeds;
