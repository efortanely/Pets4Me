import React from 'react';
import { RepositoryStatistics } from './components/repository-statistics'
import Navbar from '../common/components/Navbar'
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
import { Member } from './components/member'
import ToolDoor from './components/ToolDoor'
import './About.css';

function About() {
    const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque risus nibh, dapibus a turpis quis, laoreet sollicitudin metus. Nunc sodales vestibulum efficitur. Aenean quis tincidunt dui, non gravida odio. Nam efficitur augue quis.";

    return(
      <div>
        <Navbar/>
  
        <div className="about-header">
          <h2>About</h2>
          <div className="our-team">
            <h3>Our Team</h3>
            <hr/>
          </div>
        </div>
  
        <p className="about-p">We're a group of students at the University of Texas at Austin, working together in the Software Engineering class for Spring 2020. Our goal is to consolidate information about dog and cat breeds with the animals available at shelters to help those looking for a new furry friend make the most informed decision with their adoption.</p>
  
        <div className="members">
          <Member img={andrew} name="Andrew Cramer" role="Role" bio={bio} author_name={["Andrew Cramer", "Andrew"]} gitlab_id="acramer" tests={0}/>
          <Member img={rosemary} name="Rosemary Fortanely" role="Role" bio={bio} author_name={["Rosemary Fortanely", "Rosemary", "codesmary"]} gitlab_id="codesmary" tests={0}/>
          <Member img={connor} name="Connor Sheehan" role="Role" bio={bio} author_name={["Connor Sheehan", "connor6321", "Connor"]} gitlab_id="connor6321" tests={0}/>
          <Member img={dean} name="Dean Torkelson" role="Role" bio={bio} author_name={["Dean Torkelson", "Dean"]} gitlab_id="deantorkelson" tests={0}/>
          <Member img={cristian} name="Cristian Garza" role="Role" bio={bio} author_name={["Cristian Garza", "Cristian"]} gitlab_id="CristianGarza" tests={0}/>
          <Member img={robert} name="Robert Hrusecky" role="Role" bio={bio} author_name={["Robert Hrusecky", "Robert"]} gitlab_id="robert-hrusecky" tests={0}/>
        </div>
  
        <RepositoryStatistics/>
  
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

          <ToolDoor img={ts} title="TypeScript" desc="This is how the tool was used."/>
          <ToolDoor img={reactlogo} title="React" desc="This is how the tool was used."/>
          <ToolDoor img={reactrouter} title="React Router" desc="This is how the tool was used."/>
          <ToolDoor img={reactbootstrap} title="React Bootstrap" desc="This is how the tool was used."/>
          <ToolDoor img={marvel} title="Marvel App" desc="This is how the tool was used."/>
  
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