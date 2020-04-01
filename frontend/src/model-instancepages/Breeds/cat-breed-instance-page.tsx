import React from 'react'
import Pets4meCatBreedsServiceContext from '../../common/services/pets4me-cat-breeds-service';
import CatBreedsService from '../../common/services/cat-breeds-service';
import { CatBreed } from '../../models/cat-breed';
import Image from 'react-bootstrap/Image'
import Figure from 'react-bootstrap/Figure'
import logo from '../../static/logo.png';
import { match } from 'react-router-dom'
import { Link } from 'react-router-dom';

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
    const pets4meCatBreedService: CatBreedsService = this.context
    return pets4meCatBreedService.getCatBreed(breed_id)
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

  render() {
    let breed: CatBreed = this.state.breed
    return (
    <div className='breed-instancepage'>
      { this.getPhoto(breed.photo) }
        <div className='instancepage-text'>
          <h1 id='name'>{breed.name}</h1>
          <p id='alt-names'>Alternate Names: {breed.alt_names}</p>
          <p id='temperament'>Temperament: {breed.temperament}</p>
          <p id='life-span'>Life span: {breed.life_span?.low} - {breed.life_span?.high} yr.</p>
          <p id='indoor'>Indoor or Outdoor: {breed.indoor ? "Indoor" : "Outdoor"}</p>
          <p id='dog-friendly'>Dog Friendly: {breed.dog_friendly ? "Yes" : "No"}</p>
          <p id='child-friendly'>Child Friendly: {breed.child_friendly ? "Yes" : "No"}</p>
          <p id='grooming-level'>Grooming Level: {breed.grooming_level}</p>
          <p id='pets-with-breed'>Cats with this breed: {this.getLinkedUrl(breed.cat_ids, 'pets')}</p>
          <p id='shelters-with-breed'>Local shelters with breed: {this.getLinkedUrl(breed.local_shelters_with_breed, 'shelters')}</p>
        </div>
        <Figure>
            <Figure.Image
              width={80}
              height={31}
              src="https://pixabay.com/static/img/logo.png"
            />
        </Figure>
      </div>
    )
  }
}

export default CatBreedInstancePage
