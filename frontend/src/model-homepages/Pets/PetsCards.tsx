import React from 'react';
import tomHanks from '../../static/pets/dog1.jpeg'
import funGuy from '../../static/pets/dog2.jpeg'
import pegasus from '../../static/pets/cat1.jpeg'


function PetsCards() {
    return (
        <div>
            <form>
                <label>
                    <input type="text" name="name" placeholder='Search' />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div className='cards'>
                <div className='single-card'>
                    <img className='card-image' src={tomHanks} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Tom Hanks
                    </h3>
                        Pit mix<br></br>
                        65 lbs<br></br>
                        6 years 8 months<br></br>
                        $25
                </div>
                </div>

                <div className='single-card'>
                    <img className='card-image' src={funGuy} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Fun Guy
                    </h3>
                        Shorthair Chihuahua<br></br>
                        16 lbs<br></br>
                        5 years 3 months<br></br>
                        $175
                </div>
                </div>

                <div className='single-card'>
                    <img className='card-image' src={pegasus} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Pegasus 19
                    </h3>
                        <div>
                            Domestic Shorthair<br></br>
                            4 lbs<br></br>
                            1 year 7 months<br></br>
                            $90<br></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} export default PetsCards;