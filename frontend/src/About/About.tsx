import React from 'react';
import { RepositoryStatistics } from './components/RepositoryStatistics'
import andrew from '../static/andrew.png'
import rosemary from '../static/rosemary.jpeg'
import connor from '../static/connor.jpg'
import dean from '../static/dean.jpeg'
import cristian from '../static/cristian.jpeg'
import robert from '../static/robert.png'
import petfinder from '../static/petfinder.jpg'
import dogapi from '../static/thedogapi.png'
import catapi from '../static/thecatapi.png'
import ts from '../static/tools/ts.png'
import reactlogo from '../static/tools/react.png'
import marvel from '../static/tools/marvelapp.png'
import bash from '../static/tools/bash.png'
import react_bootstrap from '../static/tools/react-bootstrap.png'
import material_ui from '../static/tools/material-ui.png'
import gitlab from '../static/gitlab.jpg'
import postman from '../static/postman.png'
import mocha from '../static/mocha.png'
import mapbox from '../static/mapbox.png'
import selenium from '../static/selenium.png'

import { Member } from './components/Member'
import ToolDoor from './components/ToolDoor'
import TestCounts from './test-count.json'
import './About.css';

function About() {
    const andrew_role = "Backend/DB Developer"
    const rosemary_role = "Backend/DB Developer"
    const connor_role = "Frontend Developer"
    const dean_role = "Frontend/Backend Developer"
    const cristian_role = "Frontend Developer"
    const robert_role = "Backend/DB Developer"

    const andrew_bio = "I'm a senior in Computer Science at UT Austin originally from Houston and before that Denver.  I have interests in machine learning and data science.  My hobbies at the moment include hiking, board games, and rock climbing."
    const rosemary_bio = "I'm a senior Computer Science/Studio Art major at UT Austin. My technical interests include machine learning and full-stack web development. I like to spend my free time working on side projects and making art."
    const connor_bio = "Senior Computer Science major at UT Austin. I enjoy full-stack web development and do research with human-support robots. My hobbies are gaming and working as a radio DJ for KVRX."
    const dean_bio = "cool guy, bad at bios 😎"
    const cristian_bio = "I'm a junior studying Computer Science at UT. I'm interested in cyber security and game development. I'm originally from San Antonio with roots in New Orleans, so I love good food, especially breakfast tacos."
    const robert_bio = "I'm a senior Computer Science major at UT Austin. I am primarily intrested in systems and theory. I like to spend my free time doing personal projects, and singing in the Colligium Musicum choir as a bass."

    return(
      <div>  
        <div className="about-header">
          <h2>About</h2>
          <div className="our-team">
            <h3>Our Team</h3>
            <hr/>
          </div>
        </div>
  
        <p className="about-p">We're a group of students at the University of Texas at Austin, working together in the Software Engineering class for Spring 2020. Our goal is to consolidate information about dog and cat breeds with the animals available at shelters to help those looking for a new furry friend make the most informed decision with their adoption.</p>
  
        <div className="members">
          <Member img={andrew} name="Andrew Cramer" role={andrew_role} bio={andrew_bio} author_name={["Andrew Cramer", "Andrew"]} gitlab_id="acramer" tests={TestCounts.Andrew}/>
          <Member img={rosemary} name="Rosemary Fortanely" role={rosemary_role} bio={rosemary_bio} author_name={["Rosemary Fortanely", "Rosemary", "codesmary"]} gitlab_id="codesmary" tests={TestCounts.Rosemary}/>
          <Member img={connor} name="Connor Sheehan" role={connor_role} bio={connor_bio} author_name={["Connor Sheehan", "connor6321", "Connor"]} gitlab_id="connor6321" tests={TestCounts.Connor}/>
          <Member img={dean} name="Dean Torkelson" role={dean_role} bio={dean_bio} author_name={["Dean Torkelson", "deantorkelson", "Dean"]} gitlab_id="deantorkelson" tests={TestCounts.Dean}/>
          <Member img={cristian} name="Cristian Garza" role={cristian_role} bio={cristian_bio} author_name={["Cristian Garza", "Cristian"]} gitlab_id="CristianGarza" tests={TestCounts.Cristian}/>
          <Member img={robert} name="Robert Hrusecky" role={robert_role} bio={robert_bio} author_name={["Robert Hrusecky", "Robert"]} gitlab_id="robert-hrusecky" tests={TestCounts.Robert}/>
        </div>
  
        <RepositoryStatistics testSum={TestCounts.sum}/>
  
        <div className="data-sources">
          <h3>Data Sources</h3>
  
          <div className="data-source">            
            <div className="rect">
              <img src={petfinder} alt="The PetFinder API logo"></img>
            </div>
            <div className="door">
              <div className="text">
                <a href="https://www.petfinder.com/developers">PetFinder API</a>
                <p></p>
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
                <p></p>
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
                <p></p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="tools">
          <h3>Tools</h3>

          <ToolDoor img={ts} title="TypeScript" desc="We used TypeScript to make our lives a little easier by introducing type safety."/>
          <ToolDoor img={reactlogo} title="React" desc="We used React for our front-end."/>
          <ToolDoor img={marvel} title="Marvel App" desc="This was used to create static mock-ups for our pages."/>
          <ToolDoor img={bash} title="Bash" desc="We used Bash to help with deployment."/>
          <ToolDoor img={react_bootstrap} title="React Bootstrap" desc="We used these front-end tools to display information in a presentable format."/>
          <ToolDoor img={material_ui} title="Material UI" desc="We used these front-end tools to add otherwise complicated components to our site with ease."/>
          <ToolDoor img={mocha} title="Mocha" desc="We used Mocha to test our frontend components."/>
          <ToolDoor img={mapbox} title="Mapbox" desc="Mapbox was used to show the location of a shelter on the map."/>
          <ToolDoor img={selenium} title="Selenium" desc="We used Selenium to test our GUI."/>
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
                <a href="https://documenter.getpostman.com/view/10430017/SzYYzJDX?version=latest">Postman</a>
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