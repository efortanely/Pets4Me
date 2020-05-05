import InfoCard from "./InfoCard";
import { DogBreed } from "../../../models/DogBreed";

export class DogBreedCard extends InfoCard<DogBreed> {
  getHeader = (): string => {
    return this.props.info.name;
  };

  getLinkPathname = (): string => {
    return `/dog-breeds/${this.props.info.id}`;
  };

  getImageSrc = (): string => {
    return this.props.info.photo;
  };

  getLifespan(): string {
    if (this.props.info.life_span.low === this.props.info.life_span.high) {
      return `Average lifespan: ${this.props.info.life_span.high} years`;
    }
    return `Average lifespan: ${this.props.info.life_span.low} - ${this.props.info.life_span.high} years`;
  }

  getOtherInfo = (): string[] => {
    let otherInfo: string[] = [];
    otherInfo.push(
      this.props.info.breed_group
        ? `Breed group: ${this.props.info.breed_group}`
        : "Breed group: unknown"
    );
    otherInfo.push(
      `${this.props.info.height_imperial.low} - ${this.props.info.height_imperial.high}" tall • ${this.props.info.weight_imperial.low} - ${this.props.info.weight_imperial.high} lbs.`
    );
    otherInfo.push(`${this.getLifespan()}`);
    return otherInfo;
  };
}
