import React from 'react'
import Pets4meSheltersServiceContext from '../../common/services/Pets4meSheltersService';
import SheltersService from '../../common/services/SheltersService';
import { Shelter, Photos } from '../../models/Shelter';
import { match, Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image';
import logo from '../../static/logo.png';
import ImageGallery from 'react-image-gallery';
import '../ModelInstancepage.css'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';

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
    const pets4meShelterService: SheltersService = this.context
    return pets4meShelterService.getShelter(shelter_id)
  }

  updateShelter = (shelter: Shelter) => {
    this.setState({ shelter: shelter })
  }

  getCurrentShelterId = (): string => {
    return `${this.state.shelter.id}`
  }
  
  getLinkedUrl = (id: number | undefined, type: string, text: string): JSX.Element => {
    if (id) {
      let route = `/${type}/${id}`;
      return <Link to={route}>{text}</Link> as JSX.Element;
    }
    return <span>{text}: Unknown.</span>
  }

  getPhoto = (photos: Photos): JSX.Element => {
    if (photos?.full && photos.full[0]){
      const images = photos.full.map(photo => {
        return {original: photo}
      });

      return <div className='instancepage-image'>
                <ImageGallery items={images} />
              </div>
    }else{
      return <div>
              <Image className='instancepage-image' src={logo} rounded />
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

  render() {
    let shelter: Shelter = this.state.shelter
    let full_address: string = (shelter.address?.address1 || "") +" "+ (shelter.address?.address2 || "") +", "+ shelter.address?.city +", "+ shelter.address?.state +" "+ shelter.address?.postcode 
    let allPets = Object.values(shelter.all_pets || {})
    return (
    <div className='shelter-instancepage'>
      {this.getPhoto(shelter.photos)}
        <div className='instancepage-text'>
          <h1 id='name'>{shelter.name}</h1>
          {/* <MapMedia address={full_address}/> */}
          <p id='address'>Address: {full_address}, {shelter.address?.country}</p>
          <p id='contact'>Contact: {shelter.contact?.email}, {shelter.contact?.phone_number}</p>
          <p id='adoption-policy'>Adoption Policy: {shelter.adoption_policy}</p>
          <p id='mission'>Mission: {shelter.mission}</p>
          <p id='distance'>Distance: {shelter.distance}</p>
          <p id='num-pets'>Top pet: {allPets.length > 0 ? this.getLinkedUrl(allPets[0].id, 'pets', allPets[0].species)  : 'None'}</p>
          <p id='top-dog-breed-id'>{this.getLinkedUrl(shelter.top_dog_breed_id, 'dog-breeds', "Top dog breed")}</p>
          <p id='top-cat-breed-id'>{this.getLinkedUrl(shelter.top_cat_breed_id, 'cat-breeds', "Top cat breed")}</p>
        </div>
      </div>
    )
  }
}

export default ShelterInstancePage
