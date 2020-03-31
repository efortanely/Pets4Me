import React from 'react'
import Pets4mePetsServiceContext from '../../common/services/pets4me-pets-service';
import PetsService from '../../common/services/pets-service';
import { Pet, BackendEntity, Photos } from '../../models/pet';
import { match, Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import logo from '../../static/logo.png';
import '../ModelInstancepage.css'

type PetProps = { pet: Pet, match: match }
type PetState = { pet: Pet }

class PetInstancePage extends React.Component<PetProps, PetState> {
  static contextType = Pets4mePetsServiceContext
  static defaultProps = {
    pet: { } as Pet
  }
  
  constructor(props: PetProps) {
    super(props)    
    this.state = {
      pet: props.pet
    }
  }

  fetchPet = (pet_id: string): Promise<Pet> => {
    const pets4mePetsService: PetsService = this.context
    return pets4mePetsService.getPet(pet_id)
  }

  updatePet = (pet: Pet) => {
    this.setState({ pet: pet })
  }

  getCurrentPetId = (): string => {
    return `${this.state.pet.id}`
  }

  getBreedType = (): string => {
    return `${this.state.pet.species?.toLowerCase()}-breeds`
  }

  getLinkedUrl = (backendEntity: BackendEntity, type: string, readable: string): JSX.Element => {
    if (backendEntity?.id) {
      let route = `/${type}/${backendEntity.id}`;
      return <Link to={route}>{backendEntity.name}</Link> as JSX.Element;
    }
    return <span>{readable} unknown.</span>
  }

  getPhoto = (photos: Photos): JSX.Element => {
    if (photos?.full && photos.full[0])
      return <Image className='instancepage-image' src={photos.full[0]} rounded />
    if (photos?.small && photos.small[0])
      return <Image className='instancepage-image' src={photos.full[0]} rounded />
    return <div>
      <Image className='instancepage-image' src={logo} rounded />
      <p>Uh-oh! No image is available for this pet.</p>
    </div>
  }

  componentDidMount() {
    const { pet_id } = this.props.match.params as any
    if(this.getCurrentPetId() !== pet_id) {
      this.fetchPet(pet_id)
        .then(this.updatePet)
        .catch(console.log)
    }
  }

  render() {
    let pet: Pet = this.state.pet
    return (
    <div className='model-instancepage'>
      {this.getPhoto(pet.photos)}
        <div className='instancepage-text'>
          <h1 id='name'>{pet.name}</h1>
          <p id='species'>Species: {pet.species}</p>
          <p id='gender'>Gender: {pet.gender}</p>
          <p id='color'>Color: {pet.color}</p>
          <p id='age'>Age: {pet.age}</p>
          <p id='size'>Size: {pet.size}</p>
          <p id='primary-breed'>Primary breed: {this.getLinkedUrl(pet.primary_breed, this.getBreedType(), 'Breed')}</p>
          <p id='secondary-breed'>Secondary breed: {this.getLinkedUrl(pet.secondary_breed, this.getBreedType(), 'Breed')}</p>
          <p id='description'>Description: {pet.description}</p>
          <p id='shelter'>Shelter this pet is located at: {this.getLinkedUrl(pet.shelter, 'shelters', 'Shelter')}</p>
          <p id='url'>More info: {pet.url}</p>
        </div>
      </div>
    )
  }
}

export default PetInstancePage