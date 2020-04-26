import React from 'react'
import ModelInstanceService from '../../common/services/ModelInstanceService';
import { Pet, BackendEntity, Photos } from '../../models/Pet';
import { match } from 'react-router-dom';
import logo from '../../static/logo.png';
import ImageCarousel from '../../common/components/ImageCarousel';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import { isNullOrUndefined } from 'util';
import MapMedia from '../../common/components/MapMedia';
import innerText from 'react-innertext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container, Col, Row } from 'react-bootstrap';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import MediaQuery from 'react-responsive';
import { Shelter } from '../../models/Shelter';
import '../ModelInstancepage.css'
import { Pets4mePetsService, Pets4meSheltersService } from '../../common/services/Pets4meModelInstanceService';

interface PetProps { pet: Pet, shelter: Shelter, match: match }
interface PetState { pet: Pet, shelter: Shelter }
interface PetInstancePageProviders { petsService: ModelInstanceService<Pet>, sheltersService: ModelInstanceService<Shelter>}

class PetInstancePage extends React.Component<PetProps, PetState> {
  static providers: PetInstancePageProviders = { petsService: Pets4mePetsService, sheltersService: Pets4meSheltersService }

  static defaultProps = {
    pet: { } as Pet,
    shelter: { } as Shelter
  }

  mouse: boolean = false

  constructor(props: PetProps) {
    super(props)
    this.state = {
      pet: props.pet,
      shelter: props.shelter
    }
  }

  fetchPet = (pet_id: string): Promise<Pet> => {
    const pets4mePetsService = PetInstancePage.providers.petsService
    return pets4mePetsService.getInstanceById(pet_id)
  }

  fetchShelter = (shelter_id: string): Promise<Shelter> => {
    const pets4meSheltersService = PetInstancePage.providers.sheltersService
    return pets4meSheltersService.getInstanceById(shelter_id)
  }

  updatePet = (pet: Pet) => {
    this.setState({ pet: pet })
  }

  updateShelter = (shelter: Shelter) => {
    this.setState({ shelter: shelter })
  }

  getCurrentPetId = (): string => {
    return `${this.state.pet.id}`
  }

  getCurrentShelterId = (): string => {
    return `${this.state.shelter.id}`
  }

  getBreedType = (): string => {
    return `${this.state.pet.species?.toLowerCase()}-breeds`
  }

  getBreedHeader = (primary_breed: BackendEntity, secondary_breed: BackendEntity): JSX.Element => {
    let primary_breed_link = this.getLinkedUrl(primary_breed, this.getBreedType(), 'Breed');
    let secondary_breed_link = this.getLinkedUrl(secondary_breed, this.getBreedType(), 'Breed');
    
    if(innerText(secondary_breed_link) === "Breed unknown."){
      return <p id='breed-header'>{primary_breed_link}</p>
    }else{
      return <p id='breed-header'>
        {primary_breed_link} / {secondary_breed_link}          
      </p>
    }
  }

  getLinkedUrl = (backendEntity: BackendEntity, type: string, readable: string): JSX.Element => {
    if (backendEntity?.id) {
      let route = `/${type}/${backendEntity.id}`;
      return <a href={route}>{backendEntity.name}</a>;
    }
    return <span>{readable} unknown.</span>
  }
  
  getShelterButton = (backendEntity: BackendEntity, type: string = "shelters"): JSX.Element => {
    if (backendEntity?.id) {
      let route = `/${type}/${backendEntity.id}`;
      return <Button className="instancepage-button" href={route}>More About {backendEntity.name}</Button>;
    }
    return <div></div>
  }

  getApiShelterAddress = (shelter: Shelter) => {
    return (shelter.address?.address1 + " " || "") + (shelter.address?.city + " "|| "") + (shelter.address?.state + " " || "") + (shelter.address?.postcode || "");
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
              <p>Uh-oh! No image is available for this pet.</p>
            </div>
    }
  }

  getAttributes = (age: string, gender: string, size: string, color: string): JSX.Element => {
    return <Container>
        <Row className="attributes">
          <Col className="age">
            <p>Age</p>
            <h4>{this.genericEmpty(age)}</h4>
          </Col>
          <Col className="gender">
            <p>Gender</p>
            <h4>{this.genericEmpty(gender)}</h4>
          </Col>
          <Col className="size">
            <p>Size</p>
            <h4>{this.genericEmpty(size)}</h4>
          </Col>
          <Col className="color">
            <p>Color</p>
            <h4>{this.genericEmpty(color)}</h4>
          </Col>
        </Row>
      </Container>
  }

  componentDidMount() {
    const { pet_id } = this.props.match.params as any
    if(this.getCurrentPetId() !== pet_id) {
      this.fetchPet(pet_id)
        .then(this.updatePet)
        .then(() => {
          this.fetchShelter(`${this.state.pet.shelter.id}`)
            .then(this.updateShelter)
            .catch(console.log)
        })
        .catch(console.log)
    }
  }

  genericEmpty(value: string): string {
    if (isNullOrUndefined(value) || value.length === 0)
      return "Unknown"
    return value;
  }

  render() {
    let pet: Pet = this.state.pet
    let shelter: Shelter = this.state.shelter

    return (
    <div className='model-instancepage'>
      <MediaQuery className="mobile" query="(max-width: 1349px)">
        <div className="instancepage-header">
          <h1 id='name'>{pet.name}</h1>
          {this.getBreedHeader(pet.primary_breed, pet.secondary_breed)}
        </div>

        {this.getPhoto(pet.photos)}
        {this.getAttributes(pet.age, pet.gender, pet.size, pet.color)}
        
        <div className="about">
          <h2>About</h2>
          <p>{this.genericEmpty(pet.description)}</p>
        </div>
        
        <Button className="instancepage-button" href={pet.url}>More About {pet.name}</Button>

        <div className="shelter-name">
          <h4 className="shelter-name-for-testing">{this.genericEmpty(pet.shelter?.name)}</h4>
          
          <Row>
            <FontAwesomeIcon className="map-marker" icon={faMapMarkerAlt} color="#581730" size="lg"/>
            <p>{this.genericEmpty(`${shelter.address?.city}, ${shelter.address?.state}`)}</p>
          </Row>
        </div>

        <div className="shelter-contact">
          <Row className="shelter-email">
            <FontAwesomeIcon className="envelope" icon={faEnvelope} color="#581730" size="lg"/>
            <p>{this.genericEmpty(shelter.contact?.email)}</p>
          </Row>

          <Row className="shelter-phone">
            <FontAwesomeIcon className="phone" icon={faPhone} color="#581730" size="lg"/>
            <p>{this.genericEmpty(shelter.contact?.phone_number)}</p>
          </Row>
        </div>

        <div className="mapMedia">
          <MapMedia address={this.getApiShelterAddress(shelter)} postcode={shelter.address?.postcode} country={shelter.address?.country}/>
        </div>

        {this.getShelterButton(pet.shelter)}
      </MediaQuery>
      <MediaQuery className="desktop" query="(min-width: 1350px)">
        <Col>
          <Row className="media-and-text">
            <Col md="auto" className="photo-and-map">
              {this.getPhoto(pet.photos)}
            </Col>

            <Col>
            <div className="instancepage-header">
              <h1 id='name'>{pet.name}</h1>
              {this.getBreedHeader(pet.primary_breed, pet.secondary_breed)}
            </div>

            {this.getAttributes(pet.age, pet.gender, pet.size, pet.color)}

            <div className="about">
              <h2>About</h2>
              <p>{this.genericEmpty(pet.description)}</p>
            </div>

            <div className="shelter-name">
              <h4 className="shelter-name-for-testing">{this.genericEmpty(pet.shelter?.name)}</h4>
              <Row>
                <FontAwesomeIcon className="map-marker" icon={faMapMarkerAlt} color="#581730" size="lg"/>
                <p>{this.genericEmpty(`${shelter.address?.city}, ${shelter.address?.state}`)}</p>
              </Row>
            </div>

            <div className="shelter-contact">
              <Row className="shelter-email">
                <FontAwesomeIcon className="envelope" icon={faEnvelope} color="#581730" size="lg"/>
                <p>{this.genericEmpty(shelter.contact?.email)}</p>
              </Row>

              <Row className="shelter-phone">
                <FontAwesomeIcon className="phone" icon={faPhone} color="#581730" size="lg"/>
                <p>{this.genericEmpty(shelter.contact?.phone_number)}</p>
              </Row>
            </div>

              <div className="mapMedia">
                <MapMedia address={this.getApiShelterAddress(shelter)} postcode={shelter.address?.postcode} country={shelter.address?.country}/>
              </div>
            </Col>
          </Row>

          <Row className="buttons">
            <Col md={{offset: 1}}>
              <Button className="instancepage-button" href={pet.url}>More About {pet.name}</Button>
            </Col>
            <Col md={{offset: 1}}>
              {this.getShelterButton(pet.shelter)}
            </Col>
          </Row>
        </Col>
      </MediaQuery>
      </div>
    )
  }
}

export default PetInstancePage
