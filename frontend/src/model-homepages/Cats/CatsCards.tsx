import React from 'react';
import domesticShorthair from '../../static/breeds/domestic-shorthair.jpg'


function CatsCards() {
    return (
        <div className='cards'>
            <a className='single-card' href="/cat-breeds/domestic-shorthair">
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
} export default CatsCards;