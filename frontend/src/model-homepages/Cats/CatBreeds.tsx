import React from 'react';
import CatsFilters from './CatsFilters'
import '../ModelHomepage.css';
import CatBreedsInfoCards from './CatBreedsInfoCards';

function CatBreeds() {
  return (
    <div className='model-homepage'>
      <div className='model-homepage-content'>
        <CatsFilters />
        <CatBreedsInfoCards />
      </div>
    </div>
  );
} export default CatBreeds;
