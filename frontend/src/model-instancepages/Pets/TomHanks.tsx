/* Tom Hanks, Big Banks */
import React from 'react';
import Image from 'react-bootstrap/Image'
import tom_img from '../../static/pets/dog1.jpeg'

function TomHanks() {
    return(
      <div className='model-instancepage'>
        <Image className='instancepage-image' src={tom_img} rounded />
        <div className='instancepage-text'>
          <h1>Tom Hanks</h1>
          <p>Breed: Pit Mix</p>
          <p>Shelter: Austin Pets Alive!</p>
          <p>Size: 65 pounds</p>
          <p>Color: White</p>
          <p>Age: 6 Years and 8 Months</p>
          <p>Species: Dog</p>
          <p>Gender: Male</p>
          <p>
          Description: Do you want a pup to burrow his big, wrinkled head into your lap for pets?
          Do you love the idea of a dog tapping his feet in excitement over a good game of fetch?
          Then look no further than Tom Hanks!
          </p>
          <p>Adoption Fee: $25</p>
          <p>Distance From Searcher: TBD</p>
          <a href="https://www.austinpetsalive.org/adopt/dogs/apa-a-62575">Check out their page!</a>
        </div>
      </div>
    );
  }

export default TomHanks;
