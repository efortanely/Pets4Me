import React from 'react';
import { InfoCard } from './InfoCard';
import { Link } from 'react-router-dom';
import logo from '../../../static/logo.png';
import { Shelter, Photos } from '../../../models/shelter';

interface ShelterCardProps { shelter: Shelter }

class ShelterCard extends React.Component<ShelterCardProps> {  
  render() {
    return (
      <Link to={{
        pathname: `/shelters/${this.props.shelter.id}`,
        state: { shelter: this.props.shelter }
        }}>
        <InfoCard image_src={this.getPhoto(this.props.shelter.photos)} header={this.props.shelter.name} other_info={this.getOtherInfo()} />
      </Link>
    )
  }

  getPhoto = (photos: Photos): string => {
    if (photos?.full && photos.full[0])
      return photos.full[0]
    if (photos?.small && photos.small[0])
      return photos.small[0]
    return logo
  }

  getOtherInfo = (): string[] => {
    let otherInfo: string[] = []
    otherInfo.push(this.props.shelter.address.city)
    otherInfo.push(`${Object.keys(this.props.shelter.all_pets || {}).length} pets availible`)
    return otherInfo
  }
}

export default ShelterCard