import React from 'react';
import { InfoCard } from './InfoCard';
import { Link } from 'react-router-dom';
import logo from '../../../static/logo.png';
import { CatBreed } from '../../../models/CatBreed';

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
    otherInfo.push(this.props.breed.alt_names.length > 0 ? `Alternate names: ${this.props.breed.alt_names.join(', ')}` : 'No alternate names')
    otherInfo.push(this.props.breed.indoor ?  'Outdoor': 'Indoor')
    switch(this.props.breed.dog_friendly){
      case 1: {
        otherInfo.push('Not dog-friendly');
        break;
      }
      case 2: {
        otherInfo.push('A little dog-friendly')
        break;
      }
      case 3: {
        otherInfo.push('Somewhat dog-friendly')
        break;
      }
      case 4: {
        otherInfo.push('Dog-friendly')
        break;
      }
      case 5: {
        otherInfo.push('Very dog-friendly')
        break;
      }
    }
    return otherInfo
  }
}

export default CatBreedCard