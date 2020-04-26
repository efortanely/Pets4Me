import InfoCard from "./InfoCard";
import { CatBreed } from "../../../models/CatBreed";

class CatBreedCard extends InfoCard<CatBreed> {
  getHeader(): string {
    return this.props.info.name;
  }

  getLinkPathname(): string {
    return `/cat-breeds/${this.props.info.id}`;
  }

  getImageSrc(): string {
    return this.props.info.photo;
  }

  getDogFriendliness(): string {
    switch (this.props.info.dog_friendly) {
      case 2: {
        return "A little dog-friendly";
      }
      case 3: {
        return "Somewhat dog-friendly";
      }
      case 4: {
        return "Dog-friendly";
      }
      case 5: {
        return "Very dog-friendly";
      }
      case 1:
      default:
        return "Not dog-friendly";
    }
  }

  getLifespan(): string {
    if (this.props.info.life_span.low === this.props.info.life_span.high) {
      return `Average lifespan: ${this.props.info.life_span.high} years`;
    }
    return `Average lifespan: ${this.props.info.life_span.low} - ${this.props.info.life_span.high} years`;
  }

  getOtherInfo = (): string[] => {
    let otherInfo: string[] = [];
    otherInfo.push(
      this.props.info.alt_names.length > 0
        ? `Alternate names: ${this.props.info.alt_names.join(", ")}`
        : "No alternate names"
    );
    otherInfo.push(
      `${
        this.props.info.indoor ? "Outdoor" : "Indoor"
      } • ${this.getDogFriendliness()}`
    );
    otherInfo.push(`${this.getLifespan()}`);
    return otherInfo;
  };
}

export default CatBreedCard;
