import React from 'react';
import DogsFilters from './DogsFilters'
import DogBreedsCards from './DogBreedsCards';
import '../ModelHomepage.css';

function DogBreeds() {

  return (
    <div className='model-homepage'>
      <div className='model-homepage-content'>
        <DogsFilters />
        <div className='cards-container'>
          <DogBreedsCards />
        </div>
      </div>
    </div>
  );
} export default DogBreeds;
