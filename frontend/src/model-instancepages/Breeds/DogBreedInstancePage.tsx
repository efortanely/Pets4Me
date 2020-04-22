import React from 'react'
import Pets4meDogBreedsService from '../../common/services/Pets4meDogBreedsService';
import { DogBreed } from '../../models/DogBreed';
import { Link } from 'react-router-dom';
import logo from '../../static/logo.png';
import '../ModelInstancepage.css'
import ModelInstanceService from '../../common/services/ModelInstanceService';
import ImageCarousel from '../../common/components/ImageCarousel';
import { isNullOrUndefined } from 'util';
import { RouteComponentProps } from 'react-router-dom';

interface DogBreedProps extends Partial<RouteComponentProps> { breed: DogBreed }
interface DogBreedState { breed: DogBreed }
interface DogBreedProviders { dogBreedsService: ModelInstanceService<DogBreed> }

class DogBreedInstancePage extends React.Component<DogBreedProps, DogBreedState> {
  static providers: DogBreedProviders = { 
    dogBreedsService: Pets4meDogBreedsService
  }

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
    const pets4meDogBreedService: ModelInstanceService<DogBreed> = DogBreedInstancePage.providers.dogBreedsService
    return pets4meDogBreedService.getInstanceById(breed_id)
  }

  updateDogBreed = (breed: DogBreed) => {
    this.setState({ breed: breed })
  }

  getCurrentBreedId = (): string => {
    return `${this.state.breed.id}`
  }

  componentDidMount() {
    const { breed_id } = this.props.match?.params as any
    if(this.getCurrentBreedId() !== breed_id) {
      this.fetchDogBreed(breed_id)
        .then(this.updateDogBreed)
        .catch(console.log)
    }
  }

  getMedia = (photo : string, video_url : string): JSX.Element => {
    if (isNullOrUndefined(photo)) {
      photo = logo
    }
    if (isNullOrUndefined(video_url)){
      video_url = "https://www.youtube.com/watch?v=ASxkyQKZE4k"
    }

    return <ImageCarousel items={[{photo: photo}, {video: video_url}]} />
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
          { this.getMedia(breed.photo, breed.video_url) }
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