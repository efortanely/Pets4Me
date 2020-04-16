import React from 'react';
import DogBreedsFilters from './DogBreedsFilters'
import { Slider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import MediaQuery from 'react-responsive';
import '../ModelHomepage.css';
import DogBreedsInfoCards from './DogBreedsInfoCards';
import { DogBreedsFiltersState, defaultFilterState, DogBreedsFiltersData } from '../../models/DogBreedsFiltersData'
import { sliderTheme } from '../ModelHomepageUtils'

interface DogBreedsProps {
  filterOptions: DogBreedsFiltersData
}

interface DogBreedsState {
  filters: DogBreedsFiltersState
}

export class DogBreeds extends React.Component<DogBreedsProps, DogBreedsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      filters: defaultFilterState
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.props.filterOptions.updateFilters = this.handleFilterUpdate;
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
            <DogBreedsFilters {...this.props.filterOptions}/>
            <div className='cards-container'>
              <DogBreedsInfoCards filters={this.state.filters}/>
            </div>
          </div>
        </MediaQuery>

        <MediaQuery query="(min-width: 950px)">
          <div className='model-homepage-content'>
            <DogBreedsFilters {...this.props.filterOptions}/>
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
