import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Slider from '@material-ui/core/Slider'


function PetsFilters() {
    return (
        <div className='filters'>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Breed
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Chihuahua</Dropdown.Item>
                    <Dropdown.Item>Pitbull/Mix</Dropdown.Item>
                    <Dropdown.Item>Domestic Shorthair</Dropdown.Item>
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

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Gender
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Male</Dropdown.Item>
                    <Dropdown.Item>Female</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div>
                <h3>Size</h3>
                <Slider/>
            </div>

            <div>
                <h3>Age</h3>
                <Slider/>
            </div>

            <div>
                <h3>Adoption fee</h3>
                <Slider/>
            </div>

            <div>
                <h3>Distance</h3>
                <Slider/>
            </div>
        </div>
    );
} export default PetsFilters;