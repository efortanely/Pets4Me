import React from 'react';
import PetsFilters from './PetsFilters'
import PetsCards from './PetsCards';
import { Slider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MediaQuery from 'react-responsive';
import '../ModelHomepage.css';

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

function Pets() {
  return (
    <div className='model-homepage'>
      <MediaQuery query="(max-width: 949px)">
        <div className='model-homepage-content'>
          <ThemeProvider theme={muiTheme}>
            <h5>Distance</h5>
              <Slider
                defaultValue={100}
                max={1000}
                valueLabelDisplay='auto'
              />

            <h5>Adoption Fee</h5>
            <Slider
              defaultValue={[0,50]}
              max={1000}
              valueLabelDisplay='auto'
            />
          </ThemeProvider>

          <PetsFilters />
          <PetsCards />
        </div>
      </MediaQuery>

      <MediaQuery query="(min-width: 950px)">
        <div className='model-homepage-content'>
          <PetsFilters />
          <div className='model-homepage-content-col'>
            <div className='sliders'>
              <div className="slider1">
                <ThemeProvider theme={muiTheme}>
                  <h5>Distance</h5>
                    <Slider
                      defaultValue={100}
                      max={1000}
                      valueLabelDisplay='auto'
                    />
                </ThemeProvider>
              </div>
              <div className="slider2">
                <ThemeProvider theme={muiTheme}>
                  <h5>Adoption Fee</h5>
                  <Slider
                    defaultValue={[0,50]}
                    max={1000}
                    valueLabelDisplay='auto'
                  />
                </ThemeProvider>
              </div>
            </div>
            <PetsCards />
          </div>
        </div>
      </MediaQuery>
    </div>
  );
} export default Pets;
