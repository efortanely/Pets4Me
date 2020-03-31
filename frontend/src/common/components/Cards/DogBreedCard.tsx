import React from 'react';
import { InfoCard } from './InfoCard';
import { DogBreed } from '../../../models/dog-breed';
import { Link } from 'react-router-dom';

interface DogBreedCardProps { breed: DogBreed }

export class DogBreedCard extends React.Component<DogBreedCardProps> {  
  render() {
    return (
      <Link to={{
        pathname: `/dog-breeds/${this.props.breed.id}`,
        state: { breed: this.props.breed }
        }}>
        <InfoCard image_src={this.props.breed.photo} header={this.props.breed.name} other_info={this.getOtherInfo()} />
      </Link>
    )
  }

  getOtherInfo = (): string[] => {
    let otherInfo: string[] = []
    otherInfo.push(this.props.breed.temperament)
    otherInfo.push(`Bred for: ${this.props.breed.bred_for}`)
    otherInfo.push(this.props.breed.breed_group)
    return otherInfo
  }
}
