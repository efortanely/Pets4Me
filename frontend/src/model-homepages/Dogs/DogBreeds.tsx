import React from 'react';
import DogsFilters from './DogsFilters'
import DogsCards from './DogsCards';
import '../ModelHomepage.css';

function DogBreeds() {
  return (
    <div className='model-homepage'>
      <div className='model-homepage-content'>
        <DogsFilters />
        <DogsCards />
      </div>
    </div>
  );
} export default DogBreeds;
