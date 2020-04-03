import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Slider from '@material-ui/core/Slider'

function SheltersFilters() {
    return (
        <div className='filters'>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Name
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>It's Raining Dogs Dog Rescue</Dropdown.Item>
                    <Dropdown.Item>Companion Animal Network</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    City
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Austin</Dropdown.Item>
                    <Dropdown.Item>Houston</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    State
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Tx</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Zip code
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>78705</Dropdown.Item>
                    <Dropdown.Item>78660</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Country
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>US</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div>
                <h5>Number of pets</h5>
                <Slider
                    defaultValue={[5,50]}
                    max={200}
                    valueLabelDisplay='auto'
                />
            </div>

            <div>
                <h5>Number of cats</h5>
                <Slider
                    defaultValue={[5,50]}
                    max={200}
                    valueLabelDisplay='auto'
                />
            </div>

            <div>
                <h5>Number of dogs</h5>
                <Slider
                    defaultValue={[5,50]}
                    max={200}
                    valueLabelDisplay='auto'
                />
            </div>

        </div>
    );
} export default SheltersFilters;