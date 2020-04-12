import InfoCard from './InfoCard';
import { CatBreed } from '../../../models/CatBreed';

class CatBreedCard extends InfoCard<CatBreed> {
  getHeader(): string {
    return this.props.info.name
  }

  getLinkPathname(): string {
    return `/cat-breeds/${this.props.info.id}`
  }

  getImageSrc(): string {
    return this.props.info.photo
  }  

  getOtherInfo = (): string[] => {
    let otherInfo: string[] = []
    otherInfo.push(this.props.info.alt_names.length > 0 ? `Alternate names: ${this.props.info.alt_names.join(', ')}` : 'No alternate names')
    otherInfo.push(this.props.info.indoor ?  'Outdoor': 'Indoor')
    switch(this.props.info.dog_friendly){
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