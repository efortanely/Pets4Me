import React from 'react'
import Pets4mePetsServiceContext from '../../common/services/Pets4mePetsService';
import ModelInstanceService from '../../common/services/ModelInstanceService';
import { Pet, BackendEntity, Photos } from '../../models/Pet';
import { match, Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import logo from '../../static/logo.png';
import '../ModelInstancepage.css'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImageCarousel from '../../common/components/ImageCarouesel';
import { isNullOrUndefined } from 'util';


type PetProps = { pet: Pet, match: match }
type PetState = { pet: Pet }

class PetInstancePage extends React.Component<PetProps, PetState> {
  static contextType = Pets4mePetsServiceContext
  static defaultProps = {
    pet: { } as Pet
  }

  mouse: boolean = false

  constructor(props: PetProps) {
    super(props)
    this.state = {
      pet: props.pet
    }
  }

  fetchPet = (pet_id: string): Promise<Pet> => {
    const pets4mePetsService: ModelInstanceService<Pet> = this.context
    return pets4mePetsService.getInstanceById(pet_id)
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
    if (photos?.full && photos.full[0]){
      const images = photos.full.map(photo => {
        return {original: photo}
      });

      return (
      <div className='instancepage-image'>
        <ImageCarousel images={images}/>
      </div>
      )
    }
    else {
      return <div>
              <Image className='instancepage-image' src={logo} rounded />
              <p>Uh-oh! No image is available for this pet.</p>
            </div>
    }
  }

  componentDidMount() {
    const { pet_id } = this.props.match.params as any
    if(this.getCurrentPetId() !== pet_id) {
      this.fetchPet(pet_id)
        .then(this.updatePet)
        .catch(console.log)
    }
  }

  genericEmpty(value: string): string {
    if (isNullOrUndefined(value) || value.length === 0)
      return "None specified."
    return value;
  }

  render() {
    let pet: Pet = this.state.pet
    return (
    <div className='model-instancepage'>
      {this.getPhoto(pet.photos)}
        <div className='instancepage-text'>
          <h1 id='name'>{pet.name}</h1>
          <p id='species'>Species: {this.genericEmpty(pet.species)}</p>
          <p id='gender'>Gender: {this.genericEmpty(pet.gender)}</p>
          <p id='color'>Color: {this.genericEmpty(pet.color)}</p>
          <p id='age'>Age: {this.genericEmpty(pet.age)}</p>
          <p id='size'>Size: {this.genericEmpty(pet.size)}</p>
          <p id='primary-breed'>Primary breed: {this.getLinkedUrl(pet.primary_breed, this.getBreedType(), 'Breed')}</p>
          <p id='secondary-breed'>Secondary breed: {this.getLinkedUrl(pet.secondary_breed, this.getBreedType(), 'Breed')}</p>
          <p id='description'>Description: {this.genericEmpty(pet.description)}</p>
          <p id='shelter'>Shelter this pet is located at: {this.getLinkedUrl(pet.shelter, 'shelters', 'Shelter')}</p>
          <p id='url'>More info: <a href={pet.url}>{pet.url}</a></p>
        </div>
      </div>
    )
  }
}

export default PetInstancePage
