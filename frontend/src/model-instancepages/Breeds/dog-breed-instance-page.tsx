import React from 'react'
import Pets4meDogBreedsServiceContext from '../../common/services/pets4me-dog-breeds-service';
import DogBreedsService from '../../common/services/dog-breeds-service';
import { DogBreed } from '../../models/dog-breed';
import { match } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import pixabay from '../../static/pixabay.png'
import '../ModelInstancepage.css'

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

  render() {
    let breed: DogBreed = this.state.breed
    return (
      <div className='model-instancepage'>
        <div>
        <Image className='instancepage-image' src={breed.photo} rounded />
        <Image className='logo' src={pixabay} />
        </div>
        <div className='instancepage-text'>
          <h1 id='name'>{breed.name}</h1>
          <p id='group'>Group: {breed.breed_group}</p>
          <p id='life-span'>Life span: {breed.life_span?.low} - {breed.life_span?.high} yr.</p>
          <p id='height'>Height range: {breed.height_imperial?.low} - {breed.height_imperial?.high} in.</p>
          <p id='weight'>Weight range: {breed.weight_imperial?.low} - {breed.weight_imperial?.high} lb.</p>
          <p id='temperament'>Temperament: {breed.temperament}</p>
          <p id='bred-for'>Bred for: {breed.bred_for}</p>
          <p id='pets-with-breed'>Dogs: {breed.dog_ids?.length}</p>
          <p id='shelters-with-breed'>Local shelters with breed: {breed.local_shelters_with_breed?.length}</p>
        </div>
      </div>
    )
  }
}

export default DogBreedInstancePage