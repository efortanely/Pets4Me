import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask } from '@fortawesome/free-solid-svg-icons'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import logo from '../static/logo.png'
import andrew from '../static/andrew.png'
import rosemary from '../static/rosemary.jpeg'
import connor from '../static/connor.jpeg'
import dean from '../static/dean.jpeg'
import cristian from '../static/cristian.jpeg'
import robert from '../static/robert.png'
import petfinder from '../static/petfinder.jpg'
import dogapi from '../static/thedogapi.png'
import catapi from '../static/thecatapi.png'
import ts from '../static/tools/ts.png'
import reactlogo from '../static/tools/react.png'
import reactrouter from '../static/tools/reactrouter.png'
import reactbootstrap from '../static/tools/reactbootstrap.png'
import marvel from '../static/tools/marvelapp.png'
import gitlab from '../static/gitlab.jpg'
import postman from '../static/postman.png'
import './About.css';

function About() {
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
  
        <div className="about-header">
          <h2>About</h2>
          <div className="our-team">
            <h3>Our Team</h3>
            <hr/>
          </div>
        </div>
  
        <p className="about-p">We're a group of students at the University of Texas at Austin, working together in the Software Engineering class for Spring 2020. Our goal is to consolidate information about dog and cat breeds with the animals available at shelters to help those looking for a new furry friend make the most informed decision with their adoption.</p>
  
        <div className="members">
  
          <div className="member">
            <svg className="svg-1">
              <rect className="top-rect" width="1" height="1"></rect>
            </svg>
            <svg className="svg-2">
              <rect className="bottom-rect" width="1" height="1"></rect>
            </svg>
            
            <img src={andrew} alt="A headshot of Andrew Cramer"></img>
            <div className="member-text">
              <h4>Andrew Cramer</h4>
              <p>Role</p>
            </div>
  
            <div className="door">
              <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque risus nibh, dapibus a turpis quis, laoreet sollicitudin metus. Nunc sodales vestibulum efficitur. Aenean quis tincidunt dui, non gravida odio. Nam efficitur augue quis.</div>
            </div>
            
            <div className="circles">
              <div className="circle" title="No. Commits">99</div>
              <div className="circle" title="No. Issues">99</div>
              <div className="circle" title="No. Unit Tests">99</div>
            </div>
  
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faCodeBranch} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faFlask} color="#528C8B" size="1x"/>
            </div>
          </div>
          
          <div className="member">
            <svg className="svg-1">
              <rect className="top-rect" width="1" height="1"></rect>
            </svg>
            <svg className="svg-2">
              <rect className="bottom-rect" width="1" height="1"></rect>
            </svg>
            
            <img src={rosemary} alt="A headshot of Rosemary Fortanely"></img>
            <div className="member-text">
              <h4>Rosemary Fortanely</h4>
              <p>Role</p>
            </div>
  
            <div className="door">
              <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque risus nibh, dapibus a turpis quis, laoreet sollicitudin metus. Nunc sodales vestibulum efficitur. Aenean quis tincidunt dui, non gravida odio. Nam efficitur augue quis.</div>
            </div>
            
            <div className="circles">
              <div className="circle" title="No. Commits">99</div>
              <div className="circle" title="No. Issues">99</div>
              <div className="circle" title="No. Unit Tests">99</div>
            </div>
  
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faCodeBranch} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faFlask} color="#528C8B" size="1x"/>
            </div>
          </div>
  
          <div className="member">
            <svg className="svg-1">
              <rect className="top-rect" width="1" height="1"></rect>
            </svg>
            <svg className="svg-2">
              <rect className="bottom-rect" width="1" height="1"></rect>
            </svg>
            
            <img src={connor} alt="A headshot of Connor Sheehan"></img>
            <div className="member-text">
              <h4>Connor Sheehan</h4>
              <p>Role</p>
            </div>
  
            <div className="door">
              <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque risus nibh, dapibus a turpis quis, laoreet sollicitudin metus. Nunc sodales vestibulum efficitur. Aenean quis tincidunt dui, non gravida odio. Nam efficitur augue quis.</div>
            </div>
            
            <div className="circles">
              <div className="circle" title="No. Commits">99</div>
              <div className="circle" title="No. Issues">99</div>
              <div className="circle" title="No. Unit Tests">99</div>
            </div>
  
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faCodeBranch} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faFlask} color="#528C8B" size="1x"/>
            </div>
          </div>
  
          <div className="member">
            <svg className="svg-1">
              <rect className="top-rect" width="1" height="1"></rect>
            </svg>
            <svg className="svg-2">
              <rect className="bottom-rect" width="1" height="1"></rect>
            </svg>
            
            <img src={dean} alt="A headshot of Dean Torkelson"></img>
            <div className="member-text">
              <h4>Dean Torkelson</h4>
              <p>Role</p>
            </div>
  
            <div className="door">
              <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque risus nibh, dapibus a turpis quis, laoreet sollicitudin metus. Nunc sodales vestibulum efficitur. Aenean quis tincidunt dui, non gravida odio. Nam efficitur augue quis.</div>
            </div>
            
            <div className="circles">
              <div className="circle" title="No. Commits">99</div>
              <div className="circle" title="No. Issues">99</div>
              <div className="circle" title="No. Unit Tests">99</div>
            </div>
  
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faCodeBranch} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faFlask} color="#528C8B" size="1x"/>
            </div>
          </div>
  
          <div className="member">
            <svg className="svg-1">
              <rect className="top-rect" width="1" height="1"></rect>
            </svg>
            <svg className="svg-2">
              <rect className="bottom-rect" width="1" height="1"></rect>
            </svg>
            
            <img src={cristian} alt="A headshot of Cristian Garza"></img>
            <div className="member-text">
              <h4>Cristian Garza</h4>
              <p>Role</p>
            </div>
  
            <div className="door">
              <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque risus nibh, dapibus a turpis quis, laoreet sollicitudin metus. Nunc sodales vestibulum efficitur. Aenean quis tincidunt dui, non gravida odio. Nam efficitur augue quis.</div>
            </div>
            
            <div className="circles">
              <div className="circle" title="No. Commits">99</div>
              <div className="circle" title="No. Issues">99</div>
              <div className="circle" title="No. Unit Tests">99</div>
            </div>
  
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faCodeBranch} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faFlask} color="#528C8B" size="1x"/>
            </div>
          </div>
  
          <div className="member">
            <svg className="svg-1">
              <rect className="top-rect" width="1" height="1"></rect>
            </svg>
            <svg className="svg-2">
              <rect className="bottom-rect" width="1" height="1"></rect>
            </svg>
            
            <img src={robert} alt="A headshot of Robert Hrusecky"></img>
            <div className="member-text">
              <h4>Robert Hrusecky</h4>
              <p>Role</p>
            </div>
          
            <div className="door">
              <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque risus nibh, dapibus a turpis quis, laoreet sollicitudin metus. Nunc sodales vestibulum efficitur. Aenean quis tincidunt dui, non gravida odio. Nam efficitur augue quis.</div>
            </div>
            
            <div className="circles">
              <div className="circle" title="No. Commits">99</div>
              <div className="circle" title="No. Issues">99</div>
              <div className="circle" title="No. Unit Tests">99</div>
            </div>
  
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faCodeBranch} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faFlask} color="#528C8B" size="1x"/>
            </div>
          </div>
        </div>
  
        <div className="repo-stats">
          <h3>Repository Statistics</h3>
          <div className="circles">
            <div className="row">
              <FontAwesomeIcon className="icon" icon={faCodeBranch} color="#528C8B" size="1x"/>
              <div className="circle">999</div>
              <p>Total No. Commits</p>
            </div>
            <div className="row">
              <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="#528C8B" size="1x"/>
              <div className="circle">999</div>
              <p>Total No. Issues⠀ ⠀</p>
            </div>
            <div className="row">
              <FontAwesomeIcon className="icon" icon={faFlask} color="#528C8B" size="1x"/>
              <div className="circle">999</div>
              <p>Total No. Unit Tests</p>
            </div>
          </div>
        </div>
  
        <div className="data-sources">
          <h3>Data Sources</h3>
  
          <div className="data-source">
            <div className="rect">
              <img src={petfinder} alt="The PetFinder API logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <a href="https://www.petfinder.com/developers">PetFinder API</a>
                <p>This is how the API was scraped.</p>
              </div>
            </div>
          </div>
          
          <div className="data-source">
            <div className="rect">
              <img src={dogapi} alt="The Dog API logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <a href="https://thedogapi.com">The Dog API</a>
                <p>This is how the API was scraped.</p>
              </div>
            </div>
          </div>
  
          <div className="data-source">
            <div className="rect">
              <img className="cat" src={catapi} alt="The Cat API logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <a href="https://thecatapi.com">The Cat API</a>
                <p>This is how the API was scraped.</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="tools">
          <h3>Tools</h3>
  
          <div className="tool">
            <div className="rect">
              <img src={ts} alt="The TypeScript logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <h5>TypeScript</h5>
                <p>This is how the tool was used.</p>
              </div>
            </div>
          </div>
  
          <div className="tool">
            <div className="rect">
              <img src={reactlogo} alt="The React logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <h5>React</h5>
                <p>This is how the tool was used.</p>
              </div>
            </div>
          </div>
  
          <div className="tool">
            <div className="rect">
              <img src={reactrouter} alt="The React Router logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <h5>React Router</h5>
                <p>This is how the tool was used.</p>
              </div>
            </div>
          </div>
  
          <div className="tool">
            <div className="rect">
              <img src={reactbootstrap} alt="The React Bootstrap logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <h5>React Bootstrap</h5>
                <p>This is how the tool was used.</p>
              </div>
            </div>
          </div>
  
          <div className="tool">
            <div className="rect">
              <img src={marvel} alt="The Marvel App logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <h5>Marvel App</h5>
                <p>This is how the tool was used.</p>
              </div>
            </div>
          </div>
  
        </div>
  
        <div className="repo-api">
          <h3>Our Repository and API</h3>
          <div className="repo-api-entity">
            <div className="rect">
              <img src={gitlab} alt="The GitLab logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <a href="https://gitlab.com/acramer/pets4me">GitLab</a>
              </div>
            </div>
          </div>
  
          <div className="repo-api-entity">
            <div className="rect">
              <img src={postman} alt="The Postman logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <a href="https://google.com">Postman</a>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <a href="https://www.freepik.com/free-photos-vectors/people">People vector created by freepik - www.freepik.com</a>
        </footer>
  
      </div>
    );
  }

export default About;