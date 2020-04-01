import React from "react";
import { Pet, Photos } from '../../../models/pet';
import { Link } from "react-router-dom";
import { InfoCard } from "./InfoCard";
import logo from '../../../static/logo.png';

interface PetCardProps { pet: Pet }

class PetCard extends React.Component<PetCardProps> {
  render() {
    return (
      <Link to={{
        pathname: `/pets/${this.props.pet.id}`,
        state: { pet: this.props.pet }
        }}>
        <InfoCard image_src={this.getPhoto(this.props.pet.photos)} header={this.props.pet.name} other_info={this.getOtherInfo()} />
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
    otherInfo.push(this.props.pet.species)
    otherInfo.push(this.props.pet.primary_breed.name)
    otherInfo.push(this.props.pet.gender)
    otherInfo.push(this.props.pet.size)
    otherInfo.push(`Age: ${this.props.pet.age}`)
    otherInfo.push(this.props.pet.color)
    otherInfo.push(this.props.pet.shelter.name)

    return otherInfo
  }
}

export default PetCard