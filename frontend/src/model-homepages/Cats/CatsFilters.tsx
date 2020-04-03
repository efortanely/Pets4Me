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
                    Child friendly
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Bad cat no</Dropdown.Item>
                    <Dropdown.Item>Yes</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Dog friendly
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Hiss meow</Dropdown.Item>
                    <Dropdown.Item>Uh huh</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Indoor/outdoor
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Indoor</Dropdown.Item>
                    <Dropdown.Item>Outdoor</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Grooming level
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Hairy boi</Dropdown.Item>
                    <Dropdown.Item>Where's the fuzz??</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Name
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Abyssinian</Dropdown.Item>
                    <Dropdown.Item>Aegean</Dropdown.Item>
                    <Dropdown.Item>American Bobtail</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <ThemeProvider theme={muiTheme}>
                <div>
                    <h5>Lifespan</h5>
                    <Slider
                        defaultValue={[2,10]}
                        max={50}
                        valueLabelDisplay='auto'
                    />
                </div>
            </ThemeProvider>
        </div>
    );
} export default CatsFilters;