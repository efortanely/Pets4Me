import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Slider from '@material-ui/core/Slider'


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

            <div>
                <h3>Average lifespan</h3>
                <Slider/>
            </div>

            <div>
                <h3>Average height</h3>
                <Slider/>
            </div>

            <div>
                <h3>Average weight</h3>
                <Slider/>
            </div>

            <div>
                <h3>Shedding level</h3>
                <Slider/>
            </div>
        </div>
    );
} export default BreedsFilters;