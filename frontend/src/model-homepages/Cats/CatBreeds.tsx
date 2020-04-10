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
          <form>
              <label>
                  <input type="text" name="global-search" placeholder='Search' />
              </label>
          </form>
          <CatBreedsFilters {...sampleFilterData}/>
          <CatBreedsInfoCards />
        </div>
      </MediaQuery>

      <MediaQuery query="(min-width: 950px)">
        <div className='model-homepage-content'>
          <CatBreedsFilters {...sampleFilterData}/>
          <div className='model-homepage-content-col'>
            <div className='sliders'>
              <form>
                <label>
                    <input type="text" name="global-search" placeholder='Search' />
                </label>
              </form>
            </div>
            <div className='cards-container'>
              <CatBreedsInfoCards />
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
} export default CatBreeds;
