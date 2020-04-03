import React from 'react';
import { InfoCard } from './InfoCard';
import { DogBreed } from '../../../models/DogBreed';
import { Link } from 'react-router-dom';
import logo from '../../../static/logo.png';

interface DogBreedCardProps { breed: DogBreed }

export class DogBreedCard extends React.Component<DogBreedCardProps> {  
  render() {
    return (
      <Link to={{
        pathname: `/dog-breeds/${this.props.breed.id}`,
        state: { breed: this.props.breed }
        }}>
        <InfoCard image_src={this.props.breed.photo || logo} header={this.props.breed.name} other_info={this.getOtherInfo()} />
      </Link>
    )
  }

  getOtherInfo = (): string[] => {
    let otherInfo: string[] = []
    otherInfo.push(this.props.breed.breed_group ? `Breed group: ${this.props.breed.breed_group}` : "Breed group unknown")
    otherInfo.push(`${this.props.breed.height_imperial.low} - ${this.props.breed.height_imperial.high}" tall`)
    otherInfo.push(`${this.props.breed.weight_imperial.low} - ${this.props.breed.weight_imperial.high} lbs.`)
    return otherInfo
  }
}
