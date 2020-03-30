import React from 'react';
import chihuahua from '../../static/breeds/chihuahua.jpg'
import staffordshire from '../../static/breeds/staffordshire-bull-terrier.jpg'
import Paginator from '../../common/components/Paginator';
import SampleDogData from '../../static/sample-dog-data.json';

function DogsCards() {
    let active = SampleDogData.page;
    let num_pages = SampleDogData.num_pages;
    return (
        <div className='cards-container'>
        <div className='cards'>
            <a className='single-card' href="/dog-breeds/chihuahua">
                <img className='card-image' src={chihuahua} alt=''></img>
                <div className='card-text'>
                    <h3>
                        Chihuahua
                    </h3>
                    Other Names: Chi, Chi-chi<br/>
                    Country of Origin: Mexico<br/>
                    Personality Traits: Charming, Graceful, Sassy<br/>
                    Species: Dog
                </div>
                </a>

            <a className='single-card' href="/dog-breeds/staffordshire">
                <img className='card-image' src={staffordshire} alt=''></img>
                <div className='card-text'>
                    <h3>
                        Staffordshire Bull Terrier
                    </h3>
                    Other Names: Stafford<br/>
                    Country of Origin: England<br/>
                    Personality Traits: Clever, Brave, Tenacious<br/>
                    Species: Dog
                </div>
            </a>
        </div>
        <Paginator active={active} numPages={num_pages} pathName={'/dog-breeds'}/>
        </div>
    );
} export default DogsCards;