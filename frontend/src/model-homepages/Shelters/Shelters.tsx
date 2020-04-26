import React from "react";
import SheltersFilters from "./SheltersFilters";
import SheltersInfoCards from "./SheltersInfoCards";
import "../ModelHomepage.css";
import MediaQuery from "react-responsive";
import Pets4meApiService from "../../common/services/Pets4meApiService";
import Spinner from "react-bootstrap/Spinner";
import {
  SheltersFiltersData,
  shelterSampleFilterData,
} from "../../models/SheltersFiltersData";
import { RouteComponentProps } from "react-router-dom";

interface SheltersState {
  filterString: string;
  filterOptions: SheltersFiltersData;
  loading: boolean;
}

export class Shelters extends React.Component<
  RouteComponentProps,
  SheltersState
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      filterString: "",
      filterOptions: shelterSampleFilterData,
      loading: true,
    };
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
  }

  public handleFilterUpdate(filters: string): void {
    this.setState({ filterString: filters });
  }

  componentDidMount() {
    let apiService = new Pets4meApiService();
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    apiService
      .getFilterOptions()
      .then((response: any) => {
        let filtersData: SheltersFiltersData = {
          cities: response.shelters.cities,
          states: response.shelters.states,
          max_pets: response.shelters.num_pets,
          max_distance: 600,
          updateFilters: this.handleFilterUpdate,
        };
        this.setState({ filterOptions: filtersData, loading: false });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="model-homepage">
        <MediaQuery query="(max-width: 1349px)">
          <div className="model-homepage-content">
            {this.state.loading ? (
              <Spinner animation="border"></Spinner>
            ) : (
              <SheltersFilters {...this.state.filterOptions} />
            )}
            <div className="cards-container">
              <SheltersInfoCards
                {...this.props}
                filterString={this.state.filterString}
              />
            </div>
          </div>
        </MediaQuery>

        <MediaQuery query="(min-width: 1350px)">
          <div className="model-homepage-content">
            {this.state.loading ? (
              <Spinner animation="border"></Spinner>
            ) : (
              <SheltersFilters {...this.state.filterOptions} />
            )}
            <div className="model-homepage-content-col">
              <div className="cards-container">
                <SheltersInfoCards
                  {...this.props}
                  filterString={this.state.filterString}
                />
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
}
export default Shelters;
