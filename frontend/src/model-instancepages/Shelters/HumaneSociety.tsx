/* Austin Homo sapiens-e Society B) */
import React from 'react';
import Image from 'react-bootstrap/Image'
import ahs_img from '../../static/shelters/ahs.jpg'

function HumaneSociety() {
    return(
      <div className='model-instancepage'>
        <Image className='instancepage-image' src={ahs_img} rounded />
        <div className='instancepage-text'>
          <h1>Austin Humane Society</h1>
          <a href="http://www.austinhumanesociety.org/">Visit their website</a>
          <p>Location: 124 W. Anderson Lane, Austin, Texas 78752</p>
          <p>Email: adoption@austinhumanesociety.org ; receiving@austinhumanesociety.org</p>
          <p>Phone Number: 512-646-7387</p>
          <p>Mission: The Austin Humane Society (AHS) offers comprehensive, humane, life-saving animal services, transforming the lives of animals and those who love them.</p>
          <a href="http://www.austinhumanesociety.org/adopt/adopt-process/">Adoption Policy</a>
          <p>Distance From Searcher: TBD</p>
          <a href="https://www.facebook.com/austinhumanesociety/">View their Facebook </a>
          <a href="https://www.instagram.com/austin_humane/?hl=en">View their Instagram</a>
          <p>Hours: M-Sat 12-7pm; Sun 12-5pm</p>
        </div>
      </div>
    );
  }

export default HumaneSociety;
