import React from 'react';
import DogBreedsFilters from './DogBreedsFilters'
import { Slider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MediaQuery from 'react-responsive';
import '../ModelHomepage.css';
import DogBreedsInfoCards from './DogBreedsInfoCards';
import { DogBreedsFiltersState, sampleFilterData, defaultFilterState } from '../../models/DogBreedsFiltersData'
import { sliderTheme } from '../ModelHomepageUtils'

interface DogBreedsState {
  filters: DogBreedsFiltersState
}

export class DogBreeds extends React.Component<{}, DogBreedsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      filters: defaultFilterState
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    sampleFilterData.updateFilters = this.handleFilterUpdate;
  }

  public handleFilterUpdate(updatedFilters: DogBreedsFiltersState): void {
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

            <ThemeProvider theme={sliderTheme}>
              <h5>Distance</h5>
              <Slider
                defaultValue={100}
                max={1000}
                valueLabelDisplay='auto'
              />
            </ThemeProvider>
            <DogBreedsFilters {...sampleFilterData}/>
            <div className='cards-container'>
              <DogBreedsInfoCards filters={this.state.filters}/>
            </div>
          </div>
        </MediaQuery>

        <MediaQuery query="(min-width: 950px)">
          <div className='model-homepage-content'>
            <DogBreedsFilters {...sampleFilterData}/>
            <div className='model-homepage-content-col'>
              <div className='sliders'>
                <form>
                  <label>
                      <input type="text" name="global-search" placeholder='Search' />
                  </label>
                </form>
                <div className="slider2">
                <ThemeProvider theme={sliderTheme}>
                  <h5>Distance</h5>
                  <Slider
                    defaultValue={100}
                    max={1000}
                    valueLabelDisplay='auto'
                  />
                </ThemeProvider>
                </div>
              </div>
              <div className='cards-container'>
                <DogBreedsInfoCards filters={this.state.filters} />
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
} export default DogBreeds;
