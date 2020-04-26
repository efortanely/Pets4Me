import React from 'react'
import { Shelter, Photos } from '../../models/Shelter';
import { match, Link } from 'react-router-dom'
import logo from '../../static/logo.png';
import MapMedia from '../../common/components/MapMedia'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ModelInstanceService from '../../common/services/ModelInstanceService';
import ImageCarousel from '../../common/components/ImageCarousel';
import MediaQuery from 'react-responsive';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { DogBreed } from '../../models/DogBreed';
import { CatBreed } from '../../models/CatBreed';
import '../ModelInstancepage.css'
import PetsInfoCarousel from '../../common/components/Cards/PetsInfoCarousel';
import { isNullOrUndefined } from 'util';
import { Pets4meSheltersService, Pets4meDogBreedsService, Pets4meCatBreedsService } from '../../common/services/Pets4meModelInstanceService';

interface ShelterProps { shelter: Shelter, dogBreed: DogBreed, catBreed: CatBreed, match: match }
interface ShelterState { shelter: Shelter, dogBreed: DogBreed, catBreed: CatBreed }
interface ShelterProviders { sheltersService: ModelInstanceService<Shelter>, dogBreedsService: ModelInstanceService<DogBreed>, catBreedsService: ModelInstanceService<CatBreed> }

class ShelterInstancePage extends React.Component<ShelterProps, ShelterState> {
  static providers: ShelterProviders = { 
    sheltersService: Pets4meSheltersService, dogBreedsService: Pets4meDogBreedsService, catBreedsService: Pets4meCatBreedsService
  }
  
  static defaultProps = {
    shelter: { } as Shelter,
    dogBreed: { } as DogBreed,
    catBreed: { } as CatBreed
  }
  
  constructor(props: ShelterProps) {
    super(props)    
    this.state = {
      shelter: props.shelter,
      dogBreed: props.dogBreed,
      catBreed: props.catBreed
    }
  }

  fetchShelter = (shelter_id: string): Promise<Shelter> => {
    const pets4meShelterService: ModelInstanceService<Shelter> = ShelterInstancePage.providers.sheltersService
    return pets4meShelterService.getInstanceById(shelter_id)
  }

  fetchDogBreed = (dog_breed_id: string): Promise<DogBreed> => {
    const pets4meDogBreedService: ModelInstanceService<DogBreed> = ShelterInstancePage.providers.dogBreedsService
    return pets4meDogBreedService.getInstanceById(dog_breed_id)
  }

  fetchCatBreed = (cat_breed_id: string): Promise<CatBreed> => {
    const pets4meCatBreedService: ModelInstanceService<CatBreed> = ShelterInstancePage.providers.catBreedsService
    return pets4meCatBreedService.getInstanceById(cat_breed_id)
  }

  updateShelter = (shelter: Shelter) => {
    this.setState({ shelter: shelter })
  }

  updateDogBreed = (dogBreed: DogBreed) => {
    this.setState({ dogBreed: dogBreed })
  }

  updateCatBreed = (catBreed: CatBreed) => {
    this.setState({ catBreed: catBreed })
  }

  getCurrentShelterId = (): string => {
    return `${this.state.shelter.id}`
  }

  getCurrentDogBreedId = (): string => {
    return `${this.state.dogBreed.id}`
  }

  getCurrentCatBreedId = (): string => {
    return `${this.state.catBreed.id}`
  }

  getShelterHeader = (shelter: Shelter) => {
    return <Container>
      <div className="shelter-contact">
        <Row>
          <FontAwesomeIcon className="map-marker" icon={faMapMarkerAlt} color="#581730" size="lg"/>
          <p id="address">{this.getDisplayShelterAddress(shelter)}</p>
        </Row>
        <Row>
          <Col className="shelter-email">
            <Row>
              <FontAwesomeIcon className="envelope" icon={faEnvelope} color="#581730" size="lg"/>
              <p id="email">{this.genericEmpty(shelter.contact?.email)}</p>
            </Row>
          </Col>
          <Col className="shelter-phone">
            <Row>
              <FontAwesomeIcon className="phone" icon={faPhone} color="#581730" size="lg"/>
              <p id="phone-number">{this.genericEmpty(shelter.contact?.phone_number)}</p>
            </Row>
          </Col>
        </Row>
      </div>
      
    </Container>
  }

  getDisplayShelterAddress = (shelter: Shelter) => {
    let address = this.formatData(shelter.address?.address1, " ") + this.formatData(shelter.address?.address2, ", ") + this.formatData(shelter.address?.city, ", ") 
      + this.formatData(shelter.address?.state, ", ") + this.formatData(shelter.address?.postcode, " ");
    if (address.length === 0) {
      return "Address info not available."
    }
    return address;
  }

  formatData(value: any, spacer: string) {
    if (value)
      return value + spacer;
    return "";
  }

  getApiShelterAddress = (shelter: Shelter) => {
    return (shelter.address?.address1 + " " || "") + (shelter.address?.city + " "|| "") + (shelter.address?.state + " " || "") + (shelter.address?.postcode || "");
  }
  
  getTopBreeds = (shelter: Shelter, dogBreed: DogBreed, catBreed: CatBreed) => {
    return <Container>
      <Row>
        <Col>
          <Row>
            <p className="top-breed">Top Dog Breed</p>
          </Row>
          <Row>
            <p className='top-breed-id'>{this.getLinkedUrl(shelter.top_dog_breed_id, 'dog-breeds', this.genericEmpty(dogBreed.name))}</p>
          </Row>
        </Col>
        <Col>
          <Row>
            <p className="top-breed">Top Cat Breed</p>
          </Row>
          <Row>
            <p className='top-breed-id'>{this.getLinkedUrl(shelter.top_cat_breed_id, 'cat-breeds', this.genericEmpty(catBreed.name))}</p>
          </Row>
        </Col>
      </Row>
    </Container>
  }

  getLinkedUrl = (id: number | undefined, type: string, text: string): JSX.Element => {
    if (id) {
      let route = `/${type}/${id}`;
      return <Link to={route}>{text}</Link> as JSX.Element;
    }
    return <span>Unknown</span>
  }

  getPetUrl = (id: number, name: string): JSX.Element => {
    let route = `/pets/${id}`;
    return <Link to={route}>{name}</Link> as JSX.Element;
  }

  getPhoto = (photos: Photos): JSX.Element => {
    if (photos?.full && photos.full[0]){
      const images = photos.full.map(photo => {
        return {photo: photo}
      });

      return <ImageCarousel items={images} />
    }else {
      return <div>
              <ImageCarousel items={[{photo: logo}]} />
              <p>Uh-oh! No image is available for this shelter.</p>
            </div>
    }
  }

  componentDidMount() {
    const { shelter_id } = this.props.match.params as any
    if(this.getCurrentShelterId() !== shelter_id) {
      this.fetchShelter(shelter_id)
        .then(this.updateShelter)
        .then(() => {
          this.fetchDogBreed(`${this.state.shelter.top_dog_breed_id}`)
            .then(this.updateDogBreed)
            .catch(console.log)
        })
        .then(() => {
          this.fetchCatBreed(`${this.state.shelter.top_cat_breed_id}`)
            .then(this.updateCatBreed)
            .catch(console.log)
        })
        .catch(console.log)
    }
  }

  getContact(): string {
    if (this.state.shelter?.contact?.email || this.state.shelter?.contact?.phone_number)
      return `${this.formatData(this.state.shelter.contact?.email, ", ")}${this.formatData(this.state.shelter.contact?.phone_number, "")}`
    return "No contact info provided."
  }

  genericEmpty(value: any): string {
    if (value)
      return value;
    return "Not specified"
  }

  render() {
    let shelter: Shelter = this.state.shelter
    let dogBreed: DogBreed = this.state.dogBreed
    let catBreed: CatBreed = this.state.catBreed
    let all_pets_ids: number[] = []
    
    if(!isNullOrUndefined(shelter.all_pets)){
      for (const pet of Object.values(shelter.all_pets)) {
        all_pets_ids.push(pet.id)
      }
    }
    
    return (
      <div className='model-instancepage'>
        <MediaQuery className="mobile" query="(max-width: 1349px)">
          <div className="instancepage-header">
            <h1 id='name'>{shelter.name}</h1>
            {this.getShelterHeader(shelter)}
          </div>
  
          {this.getPhoto(shelter.photos)}
  
          <div className="mapMedia">
            <MapMedia address={this.getApiShelterAddress(shelter)} postcode={shelter?.address?.postcode} country={shelter?.address?.country}/>
          </div>

          {this.getTopBreeds(shelter, dogBreed, catBreed)}

          <div className="adoption-policy">
            <h2>Adoption Policy</h2>
            <p id="adoption-policy">{this.genericEmpty(shelter.adoption_policy)}</p>
          </div>

          <div className="mission">
            <h2>Mission</h2>
            <p id="mission">{this.genericEmpty(shelter.mission)}</p>
          </div>

          <h2 className="cards-headers">Available Pets</h2>
          {
            all_pets_ids.length === 0 ? <p className="cards">No pets available</p> :
            <PetsInfoCarousel itemIds={all_pets_ids} />
          }
        </MediaQuery>
        <MediaQuery className="desktop" query="(min-width: 1350px)">
          <Row className="media-and-text">
            <Col md="auto" className="photo-and-map">
              {this.getPhoto(shelter.photos)}
              <div className="mapMedia">
                <MapMedia address={this.getApiShelterAddress(shelter)} postcode={shelter?.address?.postcode} country={shelter?.address?.country}/>
              </div>
            </Col>

            <Col>
            <div className="instancepage-header">
              <h1 id='name'>{shelter.name}</h1>
              {this.getShelterHeader(shelter)}
            </div>

            {this.getTopBreeds(shelter, dogBreed, catBreed)}

            <div className="adoption-policy">
              <h2>Adoption Policy</h2>
              <p id="adoption-policy">{this.genericEmpty(shelter.adoption_policy)}</p>
            </div>

            <div className="mission">
              <h2>Mission</h2>
              <p id="mission">{this.genericEmpty(shelter.mission)}</p>
            </div>
            
            <h2 className="cards-headers">Available Pets</h2>
            {
              all_pets_ids.length === 0 ? <p className="cards">No pets available</p> :
              <PetsInfoCarousel itemIds={all_pets_ids} />
            }
            </Col>
          </Row>
        </MediaQuery>
        </div>
      )
  }
}

export default ShelterInstancePage
