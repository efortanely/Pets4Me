import React from 'react';
import { InfoCard } from './InfoCard';
import { Link } from 'react-router-dom';
import logo from '../../../static/logo.png';
import { CatBreed } from '../../../models/cat-breed';

interface CatBreedCardProps { breed: CatBreed }

class CatBreedCard extends React.Component<CatBreedCardProps> {  
  render() {
    return (
      <Link to={{
        pathname: `/cat-breeds/${this.props.breed.id}`,
        state: { breed: this.props.breed }
        }}>
        <InfoCard image_src={this.props.breed.photo || logo} header={this.props.breed.name} other_info={this.getOtherInfo()} />
      </Link>
    )
  }

  getOtherInfo = (): string[] => {
    let otherInfo: string[] = []
    otherInfo.push(this.props.breed.temperament)
    otherInfo.push(this.props.breed.indoor ?  'Outdoor': 'Indoor')
    return otherInfo
  }
}

export default CatBreedCard