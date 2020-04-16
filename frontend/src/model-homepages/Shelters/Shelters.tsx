import React from 'react';
import SheltersFilters from './SheltersFilters'
import SheltersInfoCards from './SheltersInfoCards';
import '../ModelHomepage.css';
import MediaQuery from 'react-responsive';
import { SheltersFiltersState, defaultFilterState, SheltersFiltersData } from '../../models/SheltersFiltersData'

interface SheltersProps {
  filterOptions: SheltersFiltersData
}

interface SheltersState {
  filters: SheltersFiltersState
}

export class Shelters extends React.Component<SheltersProps, SheltersState> {

  constructor(props: any) {
    super(props)
    this.state = {
      filters: defaultFilterState
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.props.filterOptions.updateFilters = this.handleFilterUpdate;
  }

  public handleFilterUpdate(updatedFilters: SheltersFiltersState): void {
    this.setState({filters: updatedFilters});
  }

  render() {
    return (
      <div className='model-homepage'>
        <MediaQuery query="(max-width: 949px)">
          <div className='model-homepage-content'>
            <form>
                <label>
                    <input type="text" name="global-search" placeholder='Search' />
                </label>
            </form>
            <SheltersFilters {...this.props.filterOptions}/>
            <div className='cards-container'>
              <SheltersInfoCards filters={this.state.filters}/>
            </div>
          </div>
        </MediaQuery>

        <MediaQuery query="(min-width: 950px)">
          <div className='model-homepage-content'>
            <SheltersFilters {...this.props.filterOptions} />
            <div className='model-homepage-content-col'>
              <div className='sliders'>
                <form>
                  <label>
                      <input type="text" name="global-search" placeholder='Search' />
                  </label>
                </form>
              </div>
              <div className='cards-container'>
                <SheltersInfoCards filters={this.state.filters}/>
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
} export default Shelters;