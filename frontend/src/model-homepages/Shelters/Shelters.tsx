import React from "react";
import SheltersFilters from "./SheltersFilters";
import SheltersInfoCards from "./SheltersInfoCards";
import "../ModelHomepage.css";
import Spinner from "react-bootstrap/Spinner";
import { SheltersFilterOptions } from "../../models/SheltersFilterOptions";
import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import FilterOptionsService from "../../common/services/FiltersService";
import { Pets4meSheltersFilterOptionsService } from "../../common/services/Pets4MeFiltersService";

interface SheltersState {
  filterString: string;
  filterOptions: SheltersFilterOptions;
  loading: boolean;
}
interface SheltersProviders {
  sheltersFilterOptionsService: FilterOptionsService<SheltersFilterOptions>;
}

export class Shelters extends React.Component<
  RouteComponentProps,
  SheltersState
> {
  static providers: SheltersProviders = {
    sheltersFilterOptionsService: Pets4meSheltersFilterOptionsService,
  };

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      filterString: "",
      filterOptions: {} as SheltersFilterOptions,
      loading: true,
    };
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
  }

  public handleFilterUpdate(filters: string): void {
    this.setState({ filterString: filters });
  }

  componentDidMount() {
    let filterOptionsService = Shelters.providers.sheltersFilterOptionsService;
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    filterOptionsService
      .getFilterOptions()
      .then((response: SheltersFilterOptions) => {
        response.max_distance = 600;
        response.updateFilters = this.handleFilterUpdate;
        this.setState({ filterOptions: response, loading: false });
      })
      .catch(console.log);
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
                <SheltersFilters {...this.state.filterOptions} />
              )}
            </Col>
            <Col className="cards-container" bsPrefix="col-custom-10 col-fill">
              <SheltersInfoCards
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
export default Shelters;
