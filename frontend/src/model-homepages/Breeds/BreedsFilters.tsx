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
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Toy</Dropdown.Item>
                    <Dropdown.Item>Terrier</Dropdown.Item>
                    <Dropdown.Item>Mixed</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Species
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Cat</Dropdown.Item>
                    <Dropdown.Item>Dog</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <ThemeProvider theme={muiTheme}>
                <div>
                    <h5>Average lifespan</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>

                <div>
                    <h5>Average height</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>

                <div>
                    <h5>Average weight</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>

                <div>
                    <h5>Shedding level</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>
            </ThemeProvider>
        </div>
    );
} export default BreedsFilters;