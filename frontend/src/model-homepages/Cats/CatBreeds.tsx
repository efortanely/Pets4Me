import React from 'react';
import CatsFilters from './CatsFilters'
import CatsCards from './CatsCards';
import '../ModelHomepage.css';

function CatBreeds() {
  return (
    <div className='model-homepage'>
      <div className='model-homepage-content'>
        <CatsFilters />
        <CatsCards />
      </div>
    </div>
  );
} export default CatBreeds;
