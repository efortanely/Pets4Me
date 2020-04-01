import React from 'react';
import SheltersFilters from './SheltersFilters'
import SheltersCards from './SheltersCards';
import '../ModelHomepage.css';

function Shelters() {
  return (
    <div className='model-homepage'>
      <div className='model-homepage-content'>
        <SheltersFilters />
        <SheltersCards />
      </div>        
    </div>
  );
} export default Shelters;