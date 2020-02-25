import React from 'react';
import chihuahua from '../../static/breeds/chihuahua.jpg'
import staffordshire from '../../static/breeds/staffordshire-bull-terrier.jpg'
import domesticShorthair from '../../static/breeds/domestic-shorthair.jpg'


function BreedsCards() {
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
                    <img className='card-image' src={chihuahua} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Chihuahua
                        </h3>
                        Other Names: Chi, Chi-chi<br></br>
                        Country of Origin: Mexico<br></br>
                        Personality Traits: Charming, Graceful, Sassy<br></br>
                        Species: Dog
                </div>
                </div>

                <div className='single-card'>
                    <img className='card-image' src={staffordshire} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Staffordshire Bull Terrier
                        </h3>
                        Other Names: Stafford<br></br>
                        Country of Origin: England<br></br>
                        Personality Traits: Clever, Brave, Tenacious<br></br>
                        Species: Dog
                </div>
                </div>

                <div className='single-card'>
                    <img className='card-image' src={domesticShorthair} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Domestic Shorthair
                        </h3>
                        Other Names: Moggie, mutt<br></br>
                        Country of Origin: Worldwide<br></br>
                        Personality Traits: Playful, outgoing, friendly, loving<br></br>
                        Species: Cat
                    </div>
                </div>
            </div>
        </div>
    );
} export default BreedsCards;