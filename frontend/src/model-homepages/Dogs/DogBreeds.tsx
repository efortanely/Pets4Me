import React from 'react';
import DogsFilters from './DogsFilters'
import '../ModelHomepage.css';
import DogBreedsInfoCards from './DogBreedsInfoCards';

function DogBreeds() {

  return (
    <div className='model-homepage'>
      <div className='model-homepage-content'>
        <DogsFilters />
        <div className='cards-container'>
          <DogBreedsInfoCards />
        </div>
      </div>
    </div>
  );
} export default DogBreeds;
