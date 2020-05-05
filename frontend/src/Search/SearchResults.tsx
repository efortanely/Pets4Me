import React from 'react'
import PetsInfoCards from '../model-homepages/Pets/PetsInfoCards';
import DogBreedsInfoCards from '../model-homepages/Dogs/DogBreedsInfoCards';
import CatBreedsInfoCards from '../model-homepages/Cats/CatBreedsInfoCards';
import SheltersInfoCards from '../model-homepages/Shelters/SheltersInfoCards';
import Container from 'react-bootstrap/Container';
import { RouteComponentProps } from 'react-router-dom';

function SearchResults(props: RouteComponentProps) {
  return (
    <Container>
      <h1>Search Results</h1>
      <h2>Pets</h2>
      <PetsInfoCards {...props} itemsPerPage={3} queryPrefix='pets-'/>
      <h2>Dog Breeds</h2>
      <DogBreedsInfoCards {...props} itemsPerPage={3} queryPrefix='dog-breeds-'/>
      <h2>Cat Breeds</h2>
      <CatBreedsInfoCards {...props} itemsPerPage={3} queryPrefix='cat-breeds-'/>
      <h2>Shelters</h2>
      <SheltersInfoCards {...props} itemsPerPage={3} queryPrefix='shelters-'/>
    </Container>
  )
}


export default SearchResults