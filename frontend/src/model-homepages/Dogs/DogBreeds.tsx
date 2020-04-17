import React from 'react';
import DogBreedsFilters from './DogBreedsFilters'
import MediaQuery from 'react-responsive';
import '../ModelHomepage.css';
import DogBreedsInfoCards from './DogBreedsInfoCards';
import { sampleFilterData } from '../../models/DogBreedsFiltersData'

function DogBreeds() {
  return (
    <div className='model-homepage'>
      <MediaQuery query="(max-width: 949px)">
        <div className='model-homepage-content'>
          <DogBreedsFilters {...sampleFilterData}/>
          <div className='cards-container'>
            <DogBreedsInfoCards />
          </div>
        </div>
      </MediaQuery>

      <MediaQuery query="(min-width: 950px)">
        <div className='model-homepage-content'>
          <DogBreedsFilters {...sampleFilterData}/>
          <div className='model-homepage-content-col'>
            <div className='cards-container'>
              <DogBreedsInfoCards />
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
    );
} export default DogBreeds;
