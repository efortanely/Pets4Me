/* Austin Danimals Center B) */
import React from 'react';
import Image from 'react-bootstrap/Image'
import aac_img from '../../static/shelters/aac.jpg'

function AnimalCenter() {
    return(
      <div className='model-instancepage'>
        <Image className='instancepage-image' src={aac_img} rounded />
        <div className='instancepage-text'>
          <h1>Austin Animal Center</h1>
          <a href="http://www.austintexas.gov/department/aac">Visit their website</a>
          <p>Location: 7201 Levander Loop Bldg. A, Austin, TX 78702</p>
          <p>Email: N/A</p>
          <p>Phone Number: 311</p>
          <p>
          Mission: To provide public service and a safety net for lost and homeless animals in the community by providing necessary food, water, shelter and standard municipal veterinary care for animals in need.
          To provide placement services that will assist lost, homeless or sheltered animals to their homes or find new homes when necessary, to provide live outcomes for at least 90% of sheltered animals.
          To enforce animal regulations and assist the public with animal-related concerns, including impoundment, quarantine and other rabies control services in order to protect citizens and animals in our community.
          To provide animal services to the public in order to educate and prevent animal homelessness and promote humane, compassionate treatment of animals and responsible pet ownership.
          </p>
          <a href="http://www.austintexas.gov/department/animal-adoption">Adoption Policy</a>
          <p>Distance From Searcher: TBD</p>
          <a href="https://www.facebook.com/AustinAnimalCenter/">View their Facebook </a>
          <a href="https://www.instagram.com/austinanimalcenter/?hl=en">View their Instagram</a>
          <p>Hours: 11-7pm Sunday-Saturday</p>
        </div>
      </div>
    );
  }

export default AnimalCenter;
