/* Staffordshire Bull Terrier, couldn't come up w anything */
import React from 'react';
import Image from 'react-bootstrap/Image'
import sbt_img from '../../static/breeds/staffordshire-bull-terrier.jpg'

function StaffBullTerrier() {
    return(
      <div className='model-instancepage'>
        <Image className='instancepage-image' src={sbt_img} rounded />
        <div className='instancepage-text'>
          <h1>Staffordshire Bull Terrier</h1>
          <p>Alternate Names: Stafford</p>
          <p>Origin: England</p>
          <p>Average Lifespan: Greater Than 12 years</p>
          <p>Average weight: 31 pounds</p>
          <p>Average Height: 15 inches</p>
          <p>Personality Traits: Clever, Brave, Tenacious</p>
          <p>Category: Terrier</p>
          <p>Shedding: Occasional</p>
          <p>Species: Dog</p>
          <a href="https://www.youtube.com/watch?v=p7TUkBIakIc">More Information about the Breed</a>
        </div>
      </div>
    );
  }

export default StaffBullTerrier;
