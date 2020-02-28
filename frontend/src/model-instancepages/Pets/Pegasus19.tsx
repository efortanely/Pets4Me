/* Pegasus: Neon Genesis */
import React from 'react';
import Image from 'react-bootstrap/Image'
import pegasus_img from '../../static/pets/cat1.jpeg'

function Pegasus19() {
    return(
      <div className='model-instancepage'>
        <Image className='instancepage-image' src={pegasus_img} rounded />
        <div className='instancepage-text'>
          <h1>Pegasus 19</h1>
          <p>Breed: Domestic Shorthair</p>
          <p>Shelter: Austin Pets Alive!</p>
          <p>Size: 4 pounds</p>
          <p>Color: Brown</p>
          <p>Age: 1 Year and 7 Months</p>
          <p>Species: Cat</p>
          <p>Gender: Male</p>
          <p>
          Description: Pegasus...in Greek mythology a winged, divine horse that is strong, beautiful and represents endless possibilities.
          The perfect words to describe our brave and sweet feline friend, Pegasus!
          A graduate of the APA! bottle baby program, he was born with hip bones that do not connect correctly to his spine causing him to have incontinence issues.
          </p>
          <p>Adoption Fee: $90</p>
          <p>Distance From Searcher: TBD</p>
          <a href="https://www.austinpetsalive.org/adopt/cats/apa-a-61714">Check out their page!</a>
        </div>
      </div>
    );
  }

export default Pegasus19;
