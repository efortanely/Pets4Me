import React from 'react'
import { DogBreed } from '../../models/DogBreed';
import { Link } from 'react-router-dom';
import logo from '../../static/logo.png';
import '../ModelInstancepage.css'
import ModelInstanceService from '../../common/services/ModelInstanceService';
import ImageCarousel from '../../common/components/ImageCarousel';
import { isNullOrUndefined } from 'util';
import { RouteComponentProps } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { Row, Col, Container } from 'react-bootstrap';
import SheltersInfoCarousel from '../../common/components/Cards/SheltersInfoCarousel';
import PetsInfoCarousel from '../../common/components/Cards/PetsInfoCarousel';
import { Pets4meDogBreedsService } from '../../common/services/Pets4meModelInstanceService';

interface DogBreedProps extends Partial<RouteComponentProps> { breed: DogBreed }
interface DogBreedState { breed: DogBreed }
interface DogBreedProviders { dogBreedsService: ModelInstanceService<DogBreed> }

class DogBreedInstancePage extends React.Component<DogBreedProps, DogBreedState> {
  static providers: DogBreedProviders = { 
    dogBreedsService: Pets4meDogBreedsService
  }

  static defaultProps = {
    breed: { shelters_with_breed: [] as number[], dog_ids: [] as number[] } as DogBreed
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

  getAttributes = (height_imperial: { low: React.ReactNode; high: React.ReactNode; }, weight_imperial: { low: React.ReactNode; high: React.ReactNode; }, life_span: { low: React.ReactNode; high: React.ReactNode; }, bred_for: string): JSX.Element => {
    return <Container>
        <Row className="attributes">
          <Col className="height">
            <p>Height</p>
            <h4 id="height">{height_imperial?.low} - {height_imperial?.high} in.</h4>
          </Col>
          <Col className="weight">
            <p>Weight</p>
            <h4 id="weight">{weight_imperial?.low} - {weight_imperial?.high} lb.</h4>
          </Col>
          <Col className="life-span">
            <p>Life Span</p>
            <h4 id="life-span">{life_span?.low} - {life_span?.high} yr.</h4>
          </Col>
          <Col className="bred-for">
            <p>Bred For</p>
            <h4 id="bred-for">{this.genericEmpty(bred_for)}</h4>
          </Col>
        </Row>
      </Container>
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
      return "Unknown"
    return value;
  }

  render() {
    let breed: DogBreed = this.state.breed

    return (
      <div className='model-instancepage'>
        <MediaQuery className="mobile" query="(max-width: 1349px)">
          <div className="instancepage-header">
            <h1 id='name'>{breed.name}</h1>
            <p id="group">{this.genericEmpty(breed.breed_group)? this.genericEmpty(breed.breed_group) : ""}</p>
          </div>
  
          { this.getMedia(breed.photo, breed.video_url) }
          {this.getAttributes(breed.height_imperial, breed.weight_imperial, breed.life_span, breed.bred_for)}
          
          <div className="about">
            <h2>About</h2>
            <p id="about">{this.genericEmpty(breed.description)}</p>
          </div>

          <div className="temperament">
            <h2>Temperament</h2>
            <p id="temperament">{this.genericEmpty(breed.temperament)}</p>
          </div>

          <h2 className="cards-headers">Available Dogs</h2>
          {
            this.state.breed.dog_ids?.length === 0 ? <p className="cards">No dogs available</p> :
            <PetsInfoCarousel itemIds={breed.dog_ids} />
          }
          <br/>
          <h2 className="cards-headers">Shelters with {breed.name}s</h2>
          {
            this.state.breed.shelters_with_breed?.length === 0 ? <p className="cards">No shelters found</p> :
            <SheltersInfoCarousel itemIds={breed.shelters_with_breed} />
          }
        </MediaQuery>
        <MediaQuery className="desktop" query="(min-width: 1350px)">
          <Row className="media-and-text">
            <Col md="auto" className="photo-and-map">
              { this.getMedia(breed.photo, breed.video_url) }
            </Col>

            <Col>
            <div className="instancepage-header">
              <h1 id='name'>{breed.name}</h1>
              <p id="group">{this.genericEmpty(breed.breed_group)? this.genericEmpty(breed.breed_group) : ""}</p>
            </div>

            {this.getAttributes(breed.height_imperial, breed.weight_imperial, breed.life_span, breed.bred_for)}
            
            <div className="about">
              <h2>About</h2>
              <p id="about">{this.genericEmpty(breed.description)}</p>
            </div>

            <div className="temperament">
              <h2>Temperament</h2>
              <p id="temperament">{this.genericEmpty(breed.temperament)}</p>
            </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <h2 className="cards-headers">Available Dogs</h2>
              </Row>
              <Row>
              {
                this.state.breed.dog_ids?.length === 0 ? <p className="cards">No dogs available</p> :
                <PetsInfoCarousel itemIds={breed.dog_ids} />
              }
              </Row>
            </Col>
            <Col xs={1}>
            </Col>
            <Col>
              <Row>
                <h2 className="cards-headers">Shelters with {breed.name}s</h2>
              </Row>
              <Row>
                {
                this.state.breed.shelters_with_breed?.length === 0 ? <p className="cards">No shelters found</p> :
                 <SheltersInfoCarousel itemIds={breed.shelters_with_breed} />
                }
              </Row>
            </Col>
          </Row>
        </MediaQuery>
        
        </div>
    )
  }
}

export default DogBreedInstancePage
