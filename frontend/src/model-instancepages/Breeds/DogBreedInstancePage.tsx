import React from 'react'
import Pets4meDogBreedsServiceContext from '../../common/services/Pets4meDogBreedsService';
import DogBreedsService from '../../common/services/DogBreedsService';
import { DogBreed } from '../../models/DogBreed';
import { match } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import pixabay from '../../static/pixabay.png'
import '../ModelInstancepage.css'
import Figure from 'react-bootstrap/Figure';

type DogBreedProps = { breed: DogBreed, match: match }
type DogBreedState = { breed: DogBreed }

class DogBreedInstancePage extends React.Component<DogBreedProps, DogBreedState> {
  static contextType = Pets4meDogBreedsServiceContext
  static defaultProps = {
    breed: { } as DogBreed
  }
  
  constructor(props: DogBreedProps) {
    super(props)    
    this.state = {
      breed: props.breed
    }
  }

  fetchDogBreed = (breed_id: string): Promise<DogBreed> => {
    const pets4meDogBreedService: DogBreedsService = this.context
    return pets4meDogBreedService.getDogBreed(breed_id)
  }

  updateDogBreed = (breed: DogBreed) => {
    this.setState({ breed: breed })
  }

  getCurrentBreedId = (): string => {
    return `${this.state.breed.id}`
  }

  componentDidMount() {
    const { breed_id } = this.props.match.params as any
    if(this.getCurrentBreedId() !== breed_id) {
      this.fetchDogBreed(breed_id)
        .then(this.updateDogBreed)
        .catch(console.log)
    }
  }

  getLinkedUrl = (ids: number[], type: string): JSX.Element[] => {
    let elements: JSX.Element[] = [];
    if (!ids?.length) {
      elements.push(<span key='1'>none.</span> as JSX.Element)
      return elements;
    }
    let index = 1;
    ids.forEach(id => {
      elements.push(<Link key={index} to={`/${type}/${id}`}>{index} </Link> )
      index++;
    })
    return elements;
  }

  render() {
    let breed: DogBreed = this.state.breed
    return (
      <div className='model-instancepage'>
        <Image className='instancepage-image' src={breed.photo} rounded />
          <div className='instancepage-text'>
            <h1 id='name'>{breed.name}</h1>
            <p id='group'>Group: {breed.breed_group}</p>
            <p id='life-span'>Life span: {breed.life_span?.low} - {breed.life_span?.high} yr.</p>
            <p id='height'>Height range: {breed.height_imperial?.low} - {breed.height_imperial?.high} in.</p>
            <p id='weight'>Weight range: {breed.weight_imperial?.low} - {breed.weight_imperial?.high} lb.</p>
            <p id='temperament'>Temperament: {breed.temperament}</p>
            <p id='bred-for'>Bred for: {breed.bred_for}</p>
            <p id='pets-with-breed'>Dogs with this breed: {this.getLinkedUrl(breed.dog_ids, 'pets')}</p>
            <p id='shelters-with-breed'>Local shelters with breed: {this.getLinkedUrl(breed.local_shelters_with_breed, 'shelters')}</p>
          </div>
          <Figure>
            <Figure.Image
              width={80}
              height={31}
              src={pixabay}
            />
        </Figure>
        </div>
    )
  }
}

export default DogBreedInstancePage