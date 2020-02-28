/* Not a mushroom, just a Fun Guy */
import React from 'react';
import Image from 'react-bootstrap/Image'
import fun_guy_img from '../../static/pets/dog2.jpeg'

function FunGuy() {
    return(
      <div className='model-instancepage'>
        <Image className='instancepage-image' src={fun_guy_img} rounded />
        <div className='instancepage-text'>
          <h1>Fun Guy</h1>
          <p>Breed: Chihuahua</p>
          <p>Shelter: Austin Pets Alive!</p>
          <p>Size: 16 pounds</p>
          <p>Color: Black</p>
          <p>Age: About 5 years and 3 months</p>
          <p>Species: Dog</p>
          <p>Gender: Male</p>
          <p>
          Description: Let us tell you, it IS all in a name!
          Fun Guy is goofy and opinionated little dude that fully embraces his namesake.
          With his unique looks and comical antics, he's quite the character who has to be seen to be believed.
          </p>
          <p>Adoption Fee: $175</p>
          <p>Distance From Searcher: TBD</p>
          <a href="https://www.austinpetsalive.org/adopt/dogs/apa-a-31118">Check out their page!</a>
        </div>
      </div>
    );
  }

export default FunGuy;
