import React from 'react';
import PetsFilters from './PetsFilters';
import MediaQuery from 'react-responsive';
import '../ModelHomepage.css';
import PetsInfoCards from './PetsInfoCards';
import { sampleFilterData } from '../../models/PetsFiltersData'

function Pets() {
  return (
    <div className='model-homepage'>
      <MediaQuery query="(max-width: 949px)">
        <div className='model-homepage-content'>
          <form>
              <label>
                  <input type="text" name="global-search" placeholder='Search' />
              </label>
          </form>
          <PetsFilters {...sampleFilterData}/>
          <div className='cards-container'>
            <PetsInfoCards />
          </div>
        </div>
      </MediaQuery>

      <MediaQuery query="(min-width: 950px)">
        <div className='model-homepage-content'>
          <PetsFilters {...sampleFilterData}/>
          <div className='model-homepage-content-col'>
            <div className='sliders'>
              <form>
                <label>
                    <input type="text" name="global-search" placeholder='Search' />
                </label>
              </form>
            </div>
            <div className='cards-container'>
              <PetsInfoCards />
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
} export default Pets;
