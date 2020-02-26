import React from 'react';
import BreedsFilters from './BreedsFilters'
import BreedsCards from './BreedsCards';
import '../ModelHomepage.css';

function Breeds() {
  return (
    <div className='model-homepage'>
      <div className='model-homepage-content'>
        <BreedsFilters />
        <BreedsCards />
      </div>
    </div>
  );
} export default Breeds;