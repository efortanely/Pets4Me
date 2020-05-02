import React from 'react'
import { CatBreed } from '../../models/CatBreed';
import logo from '../../static/logo.png';
import { match } from 'react-router-dom'
import { Link } from 'react-router-dom';
import ModelInstanceService from '../../common/services/ModelInstanceService';
import ImageCarousel from '../../common/components/ImageCarousel';
import { isNullOrUndefined } from 'util';
import MediaQuery from 'react-responsive';
import { Container, Col, Row } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import PetsInfoCarousel from '../../common/components/Cards/PetsInfoCarousel';
import SheltersInfoCarousel from '../../common/components/Cards/SheltersInfoCarousel';
import { Pets4meCatBreedsService } from '../../common/services/Pets4meModelInstanceService';

interface CatBreedProps { breed: CatBreed, match: match }
interface CatBreedState { breed: CatBreed }
interface CatBreedProviders { catBreedService: ModelInstanceService<CatBreed> }

class CatBreedInstancePage extends React.Component<CatBreedProps, CatBreedState> {
  static providers: CatBreedProviders = { catBreedService: Pets4meCatBreedsService }

  static defaultProps = {
    breed: { shelters_with_breed: [] as number[], cat_ids: [] as number[] } as CatBreed
  }

  constructor(props: CatBreedProps) {
    super(props)
    this.state = {
      breed: props.breed
    }
  }

  fetchCatBreed = (breed_id: string): Promise<CatBreed> => {
    const pets4meCatBreedService: ModelInstanceService<CatBreed> = CatBreedInstancePage.providers.catBreedService
    return pets4meCatBreedService.getInstanceById(breed_id)
  }

  updateCatBreed = (breed: CatBreed) => {
    this.setState({ breed: breed })
  }

  getCurrentBreedId = (): string => {
    return `${this.state.breed.id}`
  }

  getStars = (rating: number): JSX.Element => {
    return <StarRatingComponent 
      name="star" 
      starCount={5}
      value={rating}
      editing={false}
      starColor={"#581730"}
      emptyStarColor={"#dfdbdd"}
    />
  }

  getAttributes = (life_span: { low: React.ReactNode; high: React.ReactNode; }, child_friendly: number, dog_friendly: any, grooming_level: any): JSX.Element => {
    return <Container>
        <Row className="attributes">
          <Col className="life-span">
            <p>Life Span</p>
            <h4>{life_span?.low} - {life_span?.high} yr.</h4>
          </Col>
          <Col className="child-friendly">
            <p>Child Friendly</p>
            <Row>
                {this.getStars(child_friendly)}
            </Row>
          </Col>
          <Col className="dog-friendly">
            <p>Dog Friendly</p>
            <Row>
                {this.getStars(dog_friendly)}
            </Row>
          </Col>
          <Col className="grooming-level">
            <p>Grooming</p>
            <Row>
                {this.getStars(grooming_level)}
            </Row>
          </Col>
        </Row>
      </Container>
  }

  componentDidMount() {
    const { breed_id } = this.props.match.params as any
    if(this.getCurrentBreedId() !== breed_id) {
      this.fetchCatBreed(breed_id)
        .then(this.updateCatBreed)
        .catch(console.log)
    }
  }

  getMedia = (photo : string, video_url : string): JSX.Element => {
    if (isNullOrUndefined(photo)) {
      photo = logo
    }
    if (isNullOrUndefined(video_url)){
      video_url = "https://www.youtube.com/watch?v=nM4Kb2QxPBw"
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
        <MediaQuery className="mobile" query="(max-width: 1349px)">
          <div className="instancepage-header">
            <h1 id='name'>{breed.name}</h1>
            <p id="indoor">{breed.indoor ? "Indoor" : "Outdoor"} cat</p>
          </div>
  
          { this.getMedia(breed.photo, breed.video_url) }
          {this.getAttributes(breed.life_span, breed.child_friendly, breed.dog_friendly, breed.grooming_level)}
          
          <div className="about">
            <h2>About</h2>
            <p id="about">{this.genericEmpty(breed.description)}</p>
          </div>

          <div className="alternate-names">
            <h2>Alternate Names</h2>
            <p id='alt-names'>{!breed.alt_names || breed.alt_names.length === 0 ? "No alternate names specified" : breed.alt_names.join(', ')}</p>
          </div>

          <div className="temperament">
            <h2>Temperament</h2>
            <p id="temperament">{this.genericEmpty(breed.temperament)}</p>
          </div>

          <h2 className="cards-headers">Available Cats</h2>
          {
            this.state.breed.cat_ids?.length === 0 ? <p className="cards">No cats available</p> :
            <PetsInfoCarousel itemIds={breed.cat_ids} />
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
              <p id="indoor">{breed.indoor ? "Indoor" : "Outdoor"} cat</p>
            </div>

            {this.getAttributes(breed.life_span, breed.child_friendly, breed.dog_friendly, breed.grooming_level)}

            <div className="about">
              <h2>About</h2>
              <p id="about">{this.genericEmpty(breed.description)}</p>
            </div>

            <div className="alternate-names">
              <h2>Alternate Names</h2>
              <p id='alt-names'>{!breed.alt_names || breed.alt_names.length === 0 ? "No alternate names specified" : breed.alt_names.join(', ')}</p>
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
                <h2 className="cards-headers">Available Cats</h2>
              </Row>
              <Row>
                {
                  this.state.breed.cat_ids?.length === 0 ? <p className="cards">No cats available</p> :
                  <PetsInfoCarousel itemIds={breed.cat_ids} />
                }
              </Row>
            </Col>
            <Col>
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

export default CatBreedInstancePage
