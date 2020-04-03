import React from 'react';
import DogsFilters from './DogsFilters'
import '../ModelHomepage.css';
import DogBreedsInfoCards from './DogBreedsInfoCards';
import MediaQuery from 'react-responsive';

function DogBreeds() {
  return (
    <div className='model-homepage'>
      <MediaQuery query="(max-width: 949px)">
        <div className='model-homepage-content'>
          <form>
              <label>
                  <input type="text" name="global-search" placeholder='Search' />
              </label>
          </form>
          <DogsFilters />
          <DogBreedsInfoCards />
        </div>
      </MediaQuery>

      <MediaQuery query="(min-width: 950px)">
        <div className='model-homepage-content'>
          <DogsFilters />
          <div className='model-homepage-content-col'>
            <div className='sliders'>
              <form>
                <label>
                    <input type="text" name="global-search" placeholder='Search' />
                </label>
              </form>
            </div>
            <div className='cards-container'>
              <DogBreedsInfoCards />
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
} export default DogBreeds;
