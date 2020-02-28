/* BAustin Bets BAlive */
import React from 'react';
import Image from 'react-bootstrap/Image'
import apa_img from '../../static/shelters/apa.jpg'

function AustinPetsAlive() {
    return(
      <div className='model-instancepage'>
        <Image className='instancepage-image' src={apa_img} rounded/>
        <div className='instancepage-text'>
          <h1>Austin Humane Society</h1>
          <a href="https://www.austinpetsalive.org/">Visit their website</a>
          <p>Location: 1156 West Cesar Chavez,Austin, TX 78703</p>
          <p>Email: No email address available, but you can contace the through this link:
           https://www.austinpetsalive.org/contact</p>
          <p>Phone Number: 512·961·6519</p>
          <p>Mission: To promote and provide the resources, education, and programs needed to eliminate the killing of companion animals.</p>
          <a href="https://www.austinpetsalive.org/adopt">Adoption Policy</a>
          <p>Distance From Searcher: TBD</p>
          <a href="https://www.facebook.com/austinpetsalive/">View their Facebook </a>
          <a href="https://www.instagram.com/austinpetsalive/?hl=en">View their Instagram</a>
          <p>Hours: 11-7pm Sunday-Saturday</p>
        </div>
      </div>
    );
  }

export default AustinPetsAlive;
