import React from 'react';
import CatBreedsFilters from './CatBreedsFilters'
import '../ModelHomepage.css';
import CatBreedsInfoCards from './CatBreedsInfoCards';
import MediaQuery from 'react-responsive';
import { sampleFilterData, CatBreedsFiltersState, defaultFilterState } from '../../models/CatBreedsFiltersData'

interface CatBreedsState {
  filters: CatBreedsFiltersState
}

export class CatBreeds extends React.Component<{}, CatBreedsState> {
  constructor(props: any) {
    super(props)
    this.state = {
      filters: defaultFilterState
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    sampleFilterData.updateFilters = this.handleFilterUpdate;
  }

  public handleFilterUpdate(updatedFilters: CatBreedsFiltersState): void {
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
            <CatBreedsFilters {...sampleFilterData}/>
            <CatBreedsInfoCards filters={this.state.filters}/>
          </div>
        </MediaQuery>

        <MediaQuery query="(min-width: 950px)">
          <div className='model-homepage-content'>
            <CatBreedsFilters {...sampleFilterData}/>
            <div className='model-homepage-content-col'>
              <div className='sliders'>
                <form>
                  <label>
                      <input type="text" name="global-search" placeholder='Search' />
                  </label>
                </form>
              </div>
              <div className='cards-container'>
                <CatBreedsInfoCards filters={this.state.filters}/>
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
} export default CatBreeds;
