import React from 'react'
import Pets4meCatBreedsServiceContext from '../../common/services/Pets4meCatBreedsService';
import { CatBreed } from '../../models/CatBreed';
import Image from 'react-bootstrap/Image'
import logo from '../../static/logo.png';
import { match } from 'react-router-dom'
import { Link } from 'react-router-dom';
import ModelInstanceService from '../../common/services/ModelInstanceService';
import { isNullOrUndefined } from 'util';

type CatBreedProps = { breed: CatBreed, match: match }
type CatBreedState = { breed: CatBreed }

class CatBreedInstancePage extends React.Component<CatBreedProps, CatBreedState> {
  static contextType = Pets4meCatBreedsServiceContext
  static defaultProps = {
    breed: { } as CatBreed
  }

  constructor(props: CatBreedProps) {
    super(props)
    this.state = {
      breed: props.breed
    }
  }

  fetchCatBreed = (breed_id: string): Promise<CatBreed> => {
    const pets4meCatBreedService: ModelInstanceService<CatBreed> = this.context
    return pets4meCatBreedService.getInstanceById(breed_id)
  }

  updateCatBreed = (breed: CatBreed) => {
    this.setState({ breed: breed })
  }

  getCurrentBreedId = (): string => {
    return `${this.state.breed.id}`
  }

  componentDidMount() {
    const { breed_id } = this.props.match.params as any
    if(this.getCurrentBreedId() !== breed_id) {
      this.fetchCatBreed(breed_id)
        .then(this.updateCatBreed)
        .catch(console.log)
    }
  }

  getPhoto = (photo : string): JSX.Element => {
    if (photo != null)
      return <Image className='instancepage-image' src={photo} rounded />
    return <div>
      <Image className='instancepage-image' src={logo} rounded />
      <p>Uh-oh! No image is available for this pet.</p>
    </div>
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
      return "None specified."
    return value;
  }

  printFriendliness(value: number): string{
    switch(value){
      case 1:
        return 'No';
      case 2:
        return 'A little';
      case 5:
        return 'Very';
      case 3:
      case 4:
      default:
        return 'Moderately';
    }
}

  render() {
    let breed: CatBreed = this.state.breed
    return (
    <div className='model-instancepage'>
      { this.getPhoto(breed.photo) }
        <div className='instancepage-text'>
          <h1 id='name'>{breed.name}</h1>
          <p id='alt-names'>Alternate Names: {!breed.alt_names || breed.alt_names.length === 0 ? "No alternate names specified." : breed.alt_names}</p>
          <p id='temperament'>Temperament: {this.genericEmpty(breed.temperament)}</p>
          <p id='life-span'>Life span: {breed.life_span?.low} - {breed.life_span?.high} yr.</p>
          <p id='indoor'>Indoor or Outdoor: {breed.indoor ? "Indoor" : "Outdoor"}</p>
          <p id='dog-friendly'>Dog Friendly: {this.printFriendliness(breed.dog_friendly)}</p>
          <p id='child-friendly'>Child Friendly: {this.printFriendliness(breed.child_friendly)}</p>
          <p id='grooming-level'>Grooming Level: {breed.grooming_level}/5</p>
          <p id='pets-with-breed'>Cats with this breed: {this.getLinkedUrl(breed.cat_ids, 'pets')}</p>
          <p id='shelters-with-breed'>Local shelters with breed: {this.getLinkedUrl(breed.local_shelters_with_breed, 'shelters')}</p>
        </div>
      </div>
    )
  }
}

export default CatBreedInstancePage
