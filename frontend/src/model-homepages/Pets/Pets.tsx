import React from 'react';
import PetsFilters from './PetsFilters'
import PetsCards from './PetsCards';
import '../ModelHomepage.css';

function Pets() {
  return (
    <div className='model-homepage'>
      <div className='model-homepage-content'>
        <PetsFilters />
        <PetsCards />
      </div>
    </div>
  );
} export default Pets;