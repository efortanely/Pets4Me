import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Slider from '@material-ui/core/Slider'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

function SheltersFilters() {
    return (
        <div className='filters'>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Name
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Ascending</Dropdown.Item>
                    <Dropdown.Item>Descending</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <ThemeProvider theme={muiTheme}>
                <h5>Distance</h5>
                <Slider/>
            </ThemeProvider>

            <div>
                <h5>Estimated adoption fee</h5>
                <Slider/>
            </div>

            <div>
                <h5>Number of unadopted animals</h5>
                <Slider/>
            </div>

            <div>
                <h5>Number of dogs</h5>
                <Slider/>
            </div>

            <div>
                <h5>Number of cats</h5>
                <Slider/>
            </div>

        </div>
    );
} export default SheltersFilters;