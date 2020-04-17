import React from 'react'
import Pets4meDogBreedsServiceContext from '../../common/services/Pets4meDogBreedsService';
import { DogBreed } from '../../models/DogBreed';
import { match } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../ModelInstancepage.css'
import ModelInstanceService from '../../common/services/ModelInstanceService';
import ImageCarousel from '../../common/components/ImageCarouesel';
import { isNullOrUndefined } from 'util';

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
    const pets4meDogBreedService: ModelInstanceService<DogBreed> = this.context
    return pets4meDogBreedService.getInstanceById(breed_id)
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

  genericEmpty(value: string): string {
    if (isNullOrUndefined(value) || value.length === 0)
      return "Not specified."
    return value;
  }

  render() {
    let breed: DogBreed = this.state.breed
    return (
      <div className='model-instancepage'>
        <ImageCarousel images={[{original: breed.photo}]} />
          <div className='instancepage-text'>
            <h1 id='name'>{breed.name}</h1>
            <p id='group'>Group: {this.genericEmpty(breed.breed_group)}</p>
            <p id='life-span'>Life span: {breed.life_span?.low} - {breed.life_span?.high} yr.</p>
            <p id='height'>Height range: {breed.height_imperial?.low} - {breed.height_imperial?.high} in.</p>
            <p id='weight'>Weight range: {breed.weight_imperial?.low} - {breed.weight_imperial?.high} lb.</p>
            <p id='temperament'>Temperament: {this.genericEmpty(breed.temperament)}</p>
            <p id='bred-for'>Bred for: {this.genericEmpty(breed.bred_for)}</p>
            <p id='pets-with-breed'>Dogs with this breed: {this.getLinkedUrl(breed.dog_ids, 'pets')}</p>
            <p id='shelters-with-breed'>Local shelters with breed: {this.getLinkedUrl(breed.local_shelters_with_breed, 'shelters')}</p>
          </div>
        </div>
    )
  }
}

export default DogBreedInstancePage