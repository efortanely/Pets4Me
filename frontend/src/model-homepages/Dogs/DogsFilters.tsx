import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Slider from '@material-ui/core/Slider'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

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

function BreedsFilters() {
    return (
        <div className='filters'>
            {/* I put dummy data in here for the purpose */}
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Temperament
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>YELLING</Dropdown.Item>
                    <Dropdown.Item>calm :)</Dropdown.Item>
                    <Dropdown.Item>Void king</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Bred for
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Eat cheese</Dropdown.Item>
                    <Dropdown.Item>Fight rats</Dropdown.Item>
                    <Dropdown.Item>Wear sunglasses</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Breed group
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Very small</Dropdown.Item>
                    <Dropdown.Item>VERY big</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <ThemeProvider theme={muiTheme}>
                <div>
                    <h5>Average lifespan</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>

                <div>
                    <h5>Height</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>

                <div>
                    <h5>Weight</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>
            </ThemeProvider>
        </div>
    );
} export default BreedsFilters;