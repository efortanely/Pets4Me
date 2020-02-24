import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../static/logo.png'

function Navbar() {
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
      </div>
    );
  }

export default Navbar;