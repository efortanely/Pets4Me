import React from 'react';
import CatBreedsFilters from './CatBreedsFilters'
import '../ModelHomepage.css';
import CatBreedsInfoCards from './CatBreedsInfoCards';
import MediaQuery from 'react-responsive';
import { sampleFilterData } from '../../models/CatBreedsFiltersData'

function CatBreeds() {
  return (
    <div className='model-homepage'>
      <MediaQuery query="(max-width: 949px)">
        <div className='model-homepage-content'>
          <CatBreedsFilters {...sampleFilterData}/>
          <CatBreedsInfoCards />
        </div>
      </MediaQuery>

      <MediaQuery query="(min-width: 950px)">
        <div className='model-homepage-content'>
          <CatBreedsFilters {...sampleFilterData}/>
          <div className='model-homepage-content-col'>
            <div className='cards-container'>
              <CatBreedsInfoCards />
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
} export default CatBreeds;
