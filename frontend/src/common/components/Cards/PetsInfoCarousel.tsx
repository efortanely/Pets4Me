import InfoCarousel from "./InfoCarousel";
import ModelInstanceService from '../../services/ModelInstanceService';
import InfoCard from "./InfoCard";
import { Pet } from "../../../models/Pet";
import PetCard from "./PetCard";
import { Pets4mePetsService } from "../../services/Pets4meModelInstanceService";

interface PetsInfoCarouselProviders { petsService: ModelInstanceService<Pet> }

class PetsInfoCarousel extends InfoCarousel<Pet> {
  static providers: PetsInfoCarouselProviders = {
    petsService: Pets4mePetsService
  }

  getModelInstanceService(): ModelInstanceService<Pet> {
    return PetsInfoCarousel.providers.petsService
  }

  buildInfoCard(o: Pet): InfoCard<Pet> {
    return new PetCard({ info: o, searchWords: [] })
  }

}

export default PetsInfoCarousel