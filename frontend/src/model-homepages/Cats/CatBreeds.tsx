import React from 'react';
import CatBreedsFilters from './CatBreedsFilters'
import '../ModelHomepage.css';
import CatBreedsInfoCards from './CatBreedsInfoCards';
import MediaQuery from 'react-responsive';
import { CatBreedsFiltersState, defaultFilterState, CatBreedsFiltersData } from '../../models/CatBreedsFiltersData'

interface CatsProps {
  filterOptions: CatBreedsFiltersData
}

interface CatBreedsState {
  filters: CatBreedsFiltersState
}

export class CatBreeds extends React.Component<CatsProps, CatBreedsState> {
  constructor(props: any) {
    super(props)
    this.state = {
      filters: defaultFilterState
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.props.filterOptions.updateFilters = this.handleFilterUpdate;
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
            <CatBreedsFilters {...this.props.filterOptions}/>
            <CatBreedsInfoCards filters={this.state.filters}/>
          </div>
        </MediaQuery>

        <MediaQuery query="(min-width: 950px)">
          <div className='model-homepage-content'>
            <CatBreedsFilters {...this.props.filterOptions}/>
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
