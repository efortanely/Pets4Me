import React from 'react';
import SheltersFilters from './SheltersFilters'
import SheltersInfoCards from './SheltersInfoCards';
import '../ModelHomepage.css';
import MediaQuery from 'react-responsive';
import { sampleFilterData } from '../../models/SheltersFiltersData'

function Shelters() {
  return (
    <div className='model-homepage'>
      <MediaQuery query="(max-width: 949px)">
        <div className='model-homepage-content'>
          <SheltersFilters {...sampleFilterData}/>
          <div className='cards-container'>
            <SheltersInfoCards />
          </div>
        </div>
      </MediaQuery>

      <MediaQuery query="(min-width: 950px)">
        <div className='model-homepage-content'>
          <SheltersFilters {...sampleFilterData} />
          <div className='model-homepage-content-col'>
            <div className='sliders'>
            </div>
            <div className='cards-container'>
              <SheltersInfoCards />
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
} export default Shelters;