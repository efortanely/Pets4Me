import { Pet, Photos } from "../../../models/Pet";
import InfoCard from "./InfoCard";
import logo from "../../../static/logo.png";

class PetCard extends InfoCard<Pet> {
  getHeader(): string {
    return htmlDecode(this.props.info.name);
  }
  getLinkPathname(): string {
    return `/pets/${this.props.info.id}`;
  }

  getImageSrc(): string {
    let photos: Photos = this.props.info.photos;
    if (photos?.full && photos.full[0]) return photos.full[0];
    if (photos?.small && photos.small[0]) return photos.small[0];
    return logo;
  }

  getOtherInfo = (): string[] => {
    let otherInfo: string[] = [];
    if (this.props.info.primary_breed.name) {
      otherInfo.push(this.props.info.primary_breed.name);
    } else if (this.props.info.primary_breed.fallback) {
      otherInfo.push(this.props.info.primary_breed.fallback);
    } else {
      otherInfo.push("Unknown breed");
    }
    otherInfo.push(
      `${this.props.info.size} • ${this.props.info.gender} • ${this.props.info.age}`
    );
    otherInfo.push(this.props.info.shelter.name);

    return otherInfo;
  };
}

function htmlDecode(input: string): string {
  var e = document.createElement("div");
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue!;
}

export default PetCard;
