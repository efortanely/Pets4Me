import InfoCard from './InfoCard';
import logo from '../../../static/logo.png';
import { Shelter, Photos } from '../../../models/Shelter';

class ShelterCard extends InfoCard<Shelter> {
  getHeader(): string {
    return this.props.info.name
  }

  getLinkPathname(): string {
    return `/shelters/${this.props.info.id}`
  }  

  getImageSrc = (): string => {
    let photos: Photos = this.props.info.photos
    if (photos?.full && photos.full[0])
      return photos.full[0]
    if (photos?.small && photos.small[0])
      return photos.small[0]
    return logo
  }

  getOtherInfo = (): string[] => {
    let otherInfo: string[] = []
    otherInfo.push(`${this.props.info.address.city}, ${this.props.info.address.state}`)
    otherInfo.push(`${Object.keys(this.props.info.all_pets || {}).length} pets available`)
    return otherInfo
  }
}

export default ShelterCard