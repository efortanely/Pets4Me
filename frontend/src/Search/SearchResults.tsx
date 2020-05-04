import React from 'react'
import PetsInfoCards from '../model-homepages/Pets/PetsInfoCards';
import DogBreedsInfoCards from '../model-homepages/Dogs/DogBreedsInfoCards';
import CatBreedsInfoCards from '../model-homepages/Cats/CatBreedsInfoCards';
import SheltersInfoCards from '../model-homepages/Shelters/SheltersInfoCards';
import Container from 'react-bootstrap/Container';
import { RouteComponentProps } from 'react-router-dom';
import { Row } from 'react-bootstrap';

function SearchResults(props: RouteComponentProps) {
  return (
    <Container>
      <h1>Search Results</h1>
      <Row>
        <h2>Pets</h2>
        <PetsInfoCards {...props} itemsPerPage={3}/>
      </Row>
      <Row>
        <h2>Dog Breeds</h2>
        <DogBreedsInfoCards {...props} itemsPerPage={3}/>
      </Row>
      <Row>
        <h2>Cat Breeds</h2>
        <CatBreedsInfoCards {...props} itemsPerPage={3}/>
      </Row>
      <Row>
        <h2>Shelters</h2>
        <SheltersInfoCards {...props} itemsPerPage={3}/>
      </Row>
    </Container>
  )
}


export default SearchResults