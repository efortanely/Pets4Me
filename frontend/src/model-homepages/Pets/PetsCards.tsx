import React from 'react';
import tomHanks from '../../static/pets/dog1.jpeg'
import funGuy from '../../static/pets/dog2.jpeg'
import pegasus from '../../static/pets/cat1.jpeg'
import Paginator from '../../common/components/Paginator';
import SamplePetData from '../../static/sample-pet-data.json'
import { PetsPage } from '../../models/pets-page';


function PetsCards() {
    let pets: PetsPage = SamplePetData
    let active = pets.page;
    let num_pages = pets.num_pages;

    return (
        <div>
            <div className='cards'>
                <a className='single-card' href="/pets/tom-hanks">
                    <img className='card-image' src={tomHanks} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Tom Hanks
                        </h3>
                        Terrier mix<br/>
                        Male<br/>
                        Adult‏‏‎ ‎‏‏‎ ‎●‏‏‎ ‎‏‏‎ ‎Large
                    </div>
                </a>

                <a className='single-card' href="/pets/fun-guy">
                    <img className='card-image' src={funGuy} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Fun Guy
                        </h3>
                        Chihuahua Mix<br/>
                        Male<br/>
                        Adult‏‏ ‏‏‎ ‎‏‏‎‎●‏‏‏‎ ‎‏‎ ‎‎‎‎‎‎‎‎Small
                    </div>
                </a>

                <a className='single-card' href="/pets/pegasus-19">
                    <img className='card-image' src={pegasus} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Pegasus 19
                        </h3>
                        Domestic Shorthair<br/>
                        Female<br/>
                        Adult‏‏‎ ‎‏‏‎ ‎●‏‏‎ ‎‏‏‎ ‎Small
                    </div>
                </a>
            </div>
            <Paginator active={active} numPages={num_pages} pathName={'/pets'}/>
        </div>
    );
} export default PetsCards;