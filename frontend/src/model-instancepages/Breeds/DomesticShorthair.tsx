/* Shorthair that cooks and cleans */
import React from 'react';
import Image from 'react-bootstrap/Image'
import ds_img from '../../static/breeds/domestic-shorthair.jpg'
import '../ModelInstancepage.css'

function DomesticShorthair() {
    return(
      <div className='model-instancepage'>
        <Image className='instancepage-image' src={ds_img} />
        <div className='instancepage-text'>
          <h1>Domestic Shorthair</h1>
          <p>Alternate Names: Moggie, Mutt</p>
          <p>Origin: Worldwide</p>
          <p>Average Lifespan: 14 Years</p>
          <p>Average weight: 11 pounds</p>
          <p>Average Height: 9 inches</p>
          <p>Personality Traits: Playful, outgoing, friendly, loving</p>
          <p>Category: Mixed</p>
          <p>Shedding: Low</p>
          <p>Species: Cat</p>
          <a href="https://www.youtube.com/watch?v=Aai5MFfIdkA">More Information about the Breed</a>
        </div>
      </div>
    );
  }

export default DomesticShorthair;
