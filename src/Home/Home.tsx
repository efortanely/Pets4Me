import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import logo from '../static/logo.png'
import shapeOne from '../static/shape1.svg'
import personOne from '../static/person1.svg'
import personTwo from '../static/person2.svg'
import shapeTwo from '../static/shape2.svg'
import './Home.css';

function Home() {
    return(
      <div>
        <nav>
          <div className="Logo">
            <img src={logo} alt="A logo featuring a dog and cat"></img>
            <h1>Pets4Me</h1>
          </div>
          
          <ul>
            <li>
              <Link className="nav-link" to="/">HOME</Link>
            </li>
            <li>
              <Link className="nav-link" to="/pets">PETS</Link>
            </li>
            <li>
              <Link className="nav-link" to="/breeds">BREEDS</Link>
            </li>
            <li>
              <Link className="nav-link" to="/shelters">SHELTERS</Link>
            </li>
            <li>
              <Link className="nav-link" to="/about">ABOUT</Link>
            </li>
          </ul>
        </nav>
        
        <img className="shapeOne" src={shapeOne} alt="A rounded pink shape"></img>
        <img className="personOne" src={personOne} alt="A woman holding a brown cat"></img>
        <img className="personTwo" src={personTwo} alt="A woman holding a brown dog"></img>
        <img className="shapeTwo" src={shapeTwo} alt="A rounded green shape"></img>
  
        <div className="frontPageInfo">
          <h1>Make a New Friend!</h1>
          <h2>adopt a pet today</h2>
          <p>Our goal is to make finding a new furry friend as easy as possible. Explore the best fit for your lifestyle with our dog and cat breed search engine, or jump right into discovering pets at your local shelters.</p>
  
          <FontAwesomeIcon className="paw" icon={faPaw} color="#581730" size="2x"/>
        </div>
      </div>
    );
  }

export default Home;