import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import shapeOne from '../static/shape1.svg'
import personOne from '../static/person1.svg'
import personTwo from '../static/person2.svg'
import shapeTwo from '../static/shape2.svg'
import { Link } from 'react-router-dom';
import './Home.css';

function getRandomPetLink(): any  {
  return <Link to={`/pets/${Math.floor(Math.random() * 10) + 1}`}><h2>adopt a pet today</h2></Link>
}

function Home() {
    return(
      <div>        
        <img className="shapeOne" src={shapeOne} alt="A rounded pink shape"></img>
        <img className="personOne" src={personOne} alt="A woman holding a brown cat"></img>
        <img className="personTwo" src={personTwo} alt="A woman holding a brown dog"></img>
        <img className="shapeTwo" src={shapeTwo} alt="A rounded green shape"></img>
  
        <div className="frontPageInfo">
          <h1>Make a New Friend!</h1>
          {getRandomPetLink()}
          <p>Our goal is to make finding a new furry friend as easy as possible. Explore the best fit for your lifestyle with our dog and cat breed search engine, or jump right into discovering pets at your local shelters.</p>
          <FontAwesomeIcon className="paw" icon={faPaw} color="#581730" size="2x"/>
        </div>
      </div>
    );
  }

export default Home;