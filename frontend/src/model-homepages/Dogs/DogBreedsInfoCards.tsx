import React from "react";
import { DogBreedCard } from "../../common/components/Cards/DogBreedCard";
import { DogBreed } from "../../models/DogBreed";
import InfoCards from "../../common/components/Cards/InfoCards";
import ModelInstanceService from "../../common/services/ModelInstanceService";
import { Pets4meDogBreedsService } from "../../common/services/Pets4meModelInstanceService";

interface DogBreedsProviders {
  dogBreedsService: ModelInstanceService<DogBreed>;
}

class DogBreedsInfoCards extends InfoCards<DogBreed> {
  static providers: DogBreedsProviders = {
    dogBreedsService: Pets4meDogBreedsService,
  };

  getModelInstanceService(): ModelInstanceService<DogBreed> {
    return DogBreedsInfoCards.providers.dogBreedsService;
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.filterString !== prevProps.filterString) {
      this.onPageChange(1);
    }
  }

  createInfoCard = (o: DogBreed, key: any): JSX.Element => {
    return (
      <DogBreedCard
        searchWords={Array.from(this.state.searchParams.values())}
        key={`pet-card-${key}`}
        info={o}
      />
    );
  };
}

export default DogBreedsInfoCards;
