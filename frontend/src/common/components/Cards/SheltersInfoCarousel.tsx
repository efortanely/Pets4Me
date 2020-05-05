import InfoCarousel from "./InfoCarousel";
import { Shelter } from "../../../models/Shelter";
import ModelInstanceService from "../../services/ModelInstanceService";
import ShelterCard from "./ShelterCard";
import { Pets4meSheltersService } from "../../services/Pets4meModelInstanceService";

interface SheltersInfoCarouselProviders {
  sheltersService: ModelInstanceService<Shelter>;
}

class SheltersInfoCarousel extends InfoCarousel<Shelter> {
  static providers: SheltersInfoCarouselProviders = {
    sheltersService: Pets4meSheltersService,
  };

  getModelInstanceService(): ModelInstanceService<Shelter> {
    return SheltersInfoCarousel.providers.sheltersService;
  }

  buildInfoCard(o: Shelter): JSX.Element {
    return new ShelterCard({
      info: o,
      searchWords: [],
      addToCompare: undefined,
    }).getCompareInfo();
  }
}

export default SheltersInfoCarousel;
