import InfoCard from "./InfoCard";
import logo from "../../../static/logo.png";
import { Shelter, Photos } from "../../../models/Shelter";

class ShelterCard extends InfoCard<Shelter> {
  getHeader(): string {
    return this.props.info.name;
  }

  getLinkPathname(): string {
    return `/shelters/${this.props.info.id}`;
  }

  getImageSrc = (): string => {
    let photos: Photos = this.props.info.photos;
    if (photos?.full && photos.full[0]) return photos.full[0];
    if (photos?.small && photos.small[0]) return photos.small[0];
    return logo;
  };

  getPhoneNumber = (): string => {
    if (!this.props.info.contact?.phone_number) return "No phone number given";
    return this.props.info.contact.phone_number;
  };

  getEmail = (): string => {
    if (!this.props.info.contact?.email) return "No email given";
    return this.props.info.contact.email;
  };

  petOrPets(length: number) {
    if (length === 1) return "pet";
    return "pets";
  }

  getOtherInfo = (): string[] => {
    let petCount = Object.keys(this.props.info.all_pets || {}).length;
    let otherInfo: string[] = [];
    otherInfo.push(
      `${this.props.info.address.city}, ${
        this.props.info.address.state
      } • ${petCount} ${this.petOrPets(petCount)} available`
    );
    otherInfo.push(`${this.getPhoneNumber()} • ${this.getEmail()}`);
    return otherInfo;
  };
}

export default ShelterCard;
