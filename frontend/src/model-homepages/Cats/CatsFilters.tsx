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

function CatsFilters() {
    return (
        <div className='filters'>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Temperament
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Evil</Dropdown.Item>
                    <Dropdown.Item>Malicious</Dropdown.Item>
                    <Dropdown.Item>Cruel</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Indoor/outdoor
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Either</Dropdown.Item>
                    <Dropdown.Item>Indoor</Dropdown.Item>
                    <Dropdown.Item>Outdoor</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <ThemeProvider theme={muiTheme}>
                <div>
                    <h5>Average lifespan</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>

                <div>
                    <h5>Dog friendly</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>

                <div>
                    <h5>Child friendly</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>

                <div>
                    <h5>Grooming level</h5>
                    <Slider
                    valueLabelDisplay='auto'/>
                </div>
            </ThemeProvider>
        </div>
    );
} export default CatsFilters;