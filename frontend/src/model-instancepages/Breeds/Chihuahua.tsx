/* Beverly Hills George Lopez */
import React from 'react';
import Image from 'react-bootstrap/Image'
import chi_img from '../../static/breeds/chihuahua.jpg'

function Chihuahua() {
    return(
      <div className='model-instancepage'>
        <Image className='instancepage-image' src={chi_img} rounded />
        <div className='instancepage-text'>
          <h1>Chihuahua</h1>
          <p>Alternate Names: Chi, Chi-chi</p>
          <p>Origin: Mexico</p>
          <p>Average Lifespan: 16 years</p>
          <p>Average weight: 5 pounds</p>
          <p>Average Height: 8 inches</p>
          <p>Personality Traits: Charming, Graceful, Sassy</p>
          <p>Category: Toy</p>
          <p>Shedding: Occasional</p>
          <p>Species: Dog</p>
          <a href="https://www.youtube.com/watch?v=dHX2xul3WEk">More Information about the Breed</a>
        </div>
      </div>
    );
  }

export default Chihuahua;
