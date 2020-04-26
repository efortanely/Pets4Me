import React from "react";
import InfoCards from "../../common/components/Cards/InfoCards";
import { Shelter } from "../../models/Shelter";
import ShelterCard from "../../common/components/Cards/ShelterCard";
import ModelInstanceService from "../../common/services/ModelInstanceService";
import { Pets4meSheltersService } from "../../common/services/Pets4meModelInstanceService";

interface SheltersInfoCardsProviders {
  sheltersService: ModelInstanceService<Shelter>;
}

class SheltersInfoCards extends InfoCards<Shelter> {
  static providers: SheltersInfoCardsProviders = {
    sheltersService: Pets4meSheltersService,
  };

  getModelInstanceService = (): ModelInstanceService<Shelter> => {
    return Pets4meSheltersService;
  };

  componentDidUpdate(prevProps: any) {
    if (this.props.filterString !== prevProps.filterString) {
      this.onPageChange(1);
    }
  }

  createInfoCard = (o: Shelter, key: any): JSX.Element => {
    return (
      <ShelterCard
        searchWords={Array.from(this.state.searchParams.values())}
        key={`shelter-card-${key}`}
        info={o}
      />
    );
  };
}

export default SheltersInfoCards;
