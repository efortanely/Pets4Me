import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

function PetsFilters() {
    return (
        <div className='filters'>
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
                    Breed
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>
                    <form>
                        <label>
                            <input type="text" name="name" placeholder='Search' />
                        </label>
                    </form>
                    </Dropdown.Item>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Chihuahua</Dropdown.Item>
                    <Dropdown.Item>Pitbull/Mix</Dropdown.Item>
                    <Dropdown.Item>Domestic Shorthair</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Size
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Small</Dropdown.Item>
                    <Dropdown.Item>Medium</Dropdown.Item>
                    <Dropdown.Item>Large</Dropdown.Item>
                    <Dropdown.Item>Extra Large</Dropdown.Item>
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

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Age
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Puppy</Dropdown.Item>
                    <Dropdown.Item>Young</Dropdown.Item>
                    <Dropdown.Item>Adult</Dropdown.Item>
                    <Dropdown.Item>Senior</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Color
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>
                    <form>
                        <label>
                            <input type="text" name="name" placeholder='Search' />
                        </label>
                    </form>
                    </Dropdown.Item>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Apricot/Beige</Dropdown.Item>
                    <Dropdown.Item>Bicolor</Dropdown.Item>
                    <Dropdown.Item>Black</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Shelter
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>
                    <form>
                        <label>
                            <input type="text" name="name" placeholder='Search' />
                        </label>
                    </form>
                    </Dropdown.Item>
                    <Dropdown.Item>Any</Dropdown.Item>
                    <Dropdown.Item>Austin Humane Society</Dropdown.Item>
                    <Dropdown.Item>Austin Pets Alive!</Dropdown.Item>
                    <Dropdown.Item>Austin Animal Center</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
} export default PetsFilters;