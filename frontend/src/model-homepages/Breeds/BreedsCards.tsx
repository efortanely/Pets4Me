import React from 'react';
import chihuahua from '../../static/breeds/chihuahua.jpg'
import staffordshire from '../../static/breeds/staffordshire-bull-terrier.jpg'
import domesticShorthair from '../../static/breeds/domestic-shorthair.jpg'


function BreedsCards() {
    return (
        <div className='cards'>
            <a className='single-card' href="/breeds/chihuahua">
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

            <a className='single-card' href="/breeds/staffordshire">
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

            <a className='single-card' href="/breeds/domestic-shorthair">
                <img className='card-image' src={domesticShorthair} alt=''></img>
                <div className='card-text'>
                    <h3>
                        Domestic Shorthair
                    </h3>
                    Other Names: Moggie, mutt<br/>
                    Country of Origin: Worldwide<br/>
                    Personality Traits: Playful, outgoing, friendly, loving
                    Species: Cat
                </div>
            </a>
        </div>
    );
} export default BreedsCards;