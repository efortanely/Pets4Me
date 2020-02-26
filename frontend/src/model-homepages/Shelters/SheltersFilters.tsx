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
                    <Dropdown.Item>Ascending</Dropdown.Item>
                    <Dropdown.Item>Descending</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div>
                <h3>Distance</h3>
                <Slider/>
            </div>

            <div>
                <h3>Estimated adoption fee</h3>
                <Slider/>
            </div>

            <div>
                <h3>Number of unadopted animals</h3>
                <Slider/>
            </div>

            <div>
                <h3>Number of dogs</h3>
                <Slider/>
            </div>

            <div>
                <h3>Number of cats</h3>
                <Slider/>
            </div>

        </div>
    );
} export default SheltersFilters;