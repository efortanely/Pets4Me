import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../static/logo.png'
import SearchBar from './SearchBar';

function Navbar() {
    return(
      <div className="navbar">
        <a href="/">
          <div className="Logo">
            <img src={logo} alt="A logo featuring a dog and cat"></img>
            <h1>Pets4Me</h1>
          </div>
        </a>
        <SearchBar />
        <nav>
          <ul>
            <li>
              <Link className="nav-link" to="/">HOME</Link>
            </li>
            <li>
              <Link className="nav-link" to="/pets">PETS</Link>
            </li>
            <li>
              <Link className="nav-link" to="/dog-breeds">DOG BREEDS</Link>
            </li>
            <li>
              <Link className="nav-link" to="/cat-breeds">CAT BREEDS</Link>
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
