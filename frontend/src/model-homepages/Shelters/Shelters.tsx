import React from 'react';
import SheltersFilters from './SheltersFilters'
import SheltersCards from './SheltersCards';
import '../ModelHomepage.css';
import MediaQuery from 'react-responsive';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';

const muiTheme = createMuiTheme({
  overrides:{
    MuiSlider: {
      thumb:{
      color: "#581730"
      },
      track: {
        color: '#528C8B'
      },
      rail: {
        color: '#84747B',
        width: '100%',
      }
    }
  }
});
function Shelters() {
  return (
    <div className='model-homepage'>
      <MediaQuery query="(max-width: 949px)">
        <div className='model-homepage-content'>
          <form>
              <label>
                  <input type="text" name="global-search" placeholder='Search' />
              </label>
          </form>

          <ThemeProvider theme={muiTheme}>
            <h5>Distance</h5>
              <Slider
                defaultValue={100}
                max={1000}
                valueLabelDisplay='auto'
              />
          </ThemeProvider>
          <SheltersFilters />
          <div className='cards-container'>
            <SheltersCards />
          </div>
        </div>
      </MediaQuery>

      <MediaQuery query="(min-width: 950px)">
        <div className='model-homepage-content'>
          <SheltersFilters />
          <div className='model-homepage-content-col'>
            <div className='sliders'>
              <form>
                <label>
                    <input type="text" name="global-search" placeholder='Search' />
                </label>
              </form>
              <div className="slider2">
              <ThemeProvider theme={muiTheme}>
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
              <SheltersCards />
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
} export default Shelters;