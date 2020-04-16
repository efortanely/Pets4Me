import React from 'react';
import PetsFilters from './PetsFilters';
import MediaQuery from 'react-responsive';
import '../ModelHomepage.css';
import PetsInfoCards from './PetsInfoCards';
import { PetsFiltersState, defaultFilterState, PetsFiltersData } from '../../models/PetsFiltersData'

interface PetsProps {
  filterOptions: PetsFiltersData
}

interface PetsState {
  filters: PetsFiltersState
}

export class Pets extends React.Component<PetsProps, PetsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      filters: defaultFilterState
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.props.filterOptions.updateFilters = this.handleFilterUpdate;
  }

  public handleFilterUpdate(updatedFilters: PetsFiltersState): void {
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
            <PetsFilters {...this.props.filterOptions}/>
            <div className='cards-container'>
              <PetsInfoCards filters={this.state.filters}/>
            </div>
          </div>
        </MediaQuery>

        <MediaQuery query="(min-width: 950px)">
          <div className='model-homepage-content'>
            <PetsFilters {...this.props.filterOptions}/>
            <div className='model-homepage-content-col'>
              <div className='sliders'>
                <form>
                  <label>
                      <input type="text" name="global-search" placeholder='Search' />
                  </label>
                </form>
              </div>
              <div className='cards-container'>
                <PetsInfoCards filters={this.state.filters}/>
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
} export default Pets;
