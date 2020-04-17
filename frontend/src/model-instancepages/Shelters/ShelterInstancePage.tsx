import React from 'react'
import Pets4meSheltersServiceContext from '../../common/services/Pets4meSheltersService';
import { Shelter, Photos } from '../../models/Shelter';
import { match, Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image';
import logo from '../../static/logo.png';
import MapMedia from '../../common/components/MapMedia'
import '../ModelInstancepage.css'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ModelInstanceService from '../../common/services/ModelInstanceService';
import ImageCarousel from '../../common/components/ImageCarouesel';

type ShelterProps = { shelter: Shelter, match: match }
type ShelterState = { shelter: Shelter }

class ShelterInstancePage extends React.Component<ShelterProps, ShelterState> {
  static contextType = Pets4meSheltersServiceContext
  static defaultProps = {
    shelter: { } as Shelter
  }
  
  constructor(props: ShelterProps) {
    super(props)    
    this.state = {
      shelter: props.shelter
    }
  }

  fetchShelter = (shelter_id: string): Promise<Shelter> => {
    const pets4meShelterService: ModelInstanceService<Shelter> = this.context
    return pets4meShelterService.getInstanceById(shelter_id)
  }

  updateShelter = (shelter: Shelter) => {
    this.setState({ shelter: shelter })
  }

  getCurrentShelterId = (): string => {
    return `${this.state.shelter.id}`
  }

  getDisplayShelterAddress = (shelter: Shelter) => {
    let address = this.formatData(shelter.address?.address1, " ") + this.formatData(shelter.address?.address2, ", ") + this.formatData(shelter.address?.city, ", ") 
      + this.formatData(shelter.address?.state, ", ") + this.formatData(shelter.address?.postcode, " ") + this.formatData(shelter.address?.country, "");
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
  
  getLinkedUrl = (id: number | undefined, type: string, text: string): JSX.Element => {
    if (id) {
      let route = `/${type}/${id}`;
      return <Link to={route}>{text}</Link> as JSX.Element;
    }
    return <span>{text}: Unknown.</span>
  }

  getPetUrl = (id: number, name: string): JSX.Element => {
    let route = `/pets/${id}`;
    return <Link to={route}>{name}</Link> as JSX.Element;
  }

  getPhoto = (photos: Photos): JSX.Element => {
    if (photos?.full && photos.full[0]){
      const images = photos.full.map(photo => {
        return {original: photo}
      });

      return <ImageCarousel images={images}/>
    } else {
      return <div>
              <Image src={logo} rounded />
              <p>Uh-oh! No image is available for this Shelter.</p>
            </div>
    }
  }

  componentDidMount() {
    const { shelter_id } = this.props.match.params as any
    if(this.getCurrentShelterId() !== shelter_id) {
      this.fetchShelter(shelter_id)
        .then(this.updateShelter)
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
    return "Not specified."
  }

  render() {
    let shelter: Shelter = this.state.shelter
    let allPets = Object.values(shelter.all_pets || {})
    console.log(allPets)
    return (
      <div className='model-instancepage'>
        <div className='instancepage-image'>
          {this.getPhoto(shelter.photos)}
          <div className="mapMedia">
            <MapMedia address={this.getApiShelterAddress(shelter)} postcode={shelter?.address?.postcode} country={shelter?.address?.country}/>
          </div>
        </div>
        <div className='instancepage-text'>
          <h1 id='name'>{shelter.name}</h1>
          <p id='address'>Address: {this.getDisplayShelterAddress(shelter)}</p>
          <p id='contact'>Contact: {this.getContact()}</p>
          <p id='adoption-policy'>Adoption Policy: {this.genericEmpty(shelter.adoption_policy)}</p>
          <p id='mission'>Mission: {this.genericEmpty(shelter.mission)}</p>
          <p id='distance'>Distance: {this.genericEmpty(shelter.distance)}</p>
          <p id='num-pets'>Top pet: {allPets.length > 0 ? this.getPetUrl(allPets[0].id, allPets[0].name) : 'None'}</p>
          <p id='top-dog-breed-id'>{this.getLinkedUrl(shelter.top_dog_breed_id, 'dog-breeds', "Top dog breed")}</p>
          <p id='top-cat-breed-id'>{this.getLinkedUrl(shelter.top_cat_breed_id, 'cat-breeds', "Top cat breed")}</p>
        </div>
      </div>
    )
  }
}

export default ShelterInstancePage
