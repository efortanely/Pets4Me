import React from 'react';
import SheltersFilters from './SheltersFilters'
import SheltersCards from './SheltersCards';
import '../ModelHomepage.css';
import MediaQuery from 'react-responsive';
import { SheltersFiltersData, sampleFilterData } from '../../models/SheltersFiltersData'

function handleFilterUpdate(updatedFilters: SheltersFiltersData): void {
  console.log(updatedFilters);
}

function Shelters() {
  sampleFilterData.updateFilters = handleFilterUpdate;
  return (
    <div className='model-homepage'>
      <MediaQuery query="(max-width: 949px)">
        <div className='model-homepage-content'>
          <form>
              <label>
                  <input type="text" name="global-search" placeholder='Search' />
              </label>
          </form>
          <SheltersFilters {...sampleFilterData}/>
          <div className='cards-container'>
            <SheltersCards />
          </div>
        </div>
      </MediaQuery>

      <MediaQuery query="(min-width: 950px)">
        <div className='model-homepage-content'>
          <SheltersFilters {...sampleFilterData} />
          <div className='model-homepage-content-col'>
            <div className='sliders'>
              <form>
                <label>
                    <input type="text" name="global-search" placeholder='Search' />
                </label>
              </form>
            </div>
            <div className='cards-container'>
              <SheltersCards />
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
} export default Shelters;