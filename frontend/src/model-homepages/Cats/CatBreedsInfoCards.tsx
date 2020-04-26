import React from 'react';
import CatBreedCard from '../../common/components/Cards/CatBreedCard';
import { CatBreed } from '../../models/CatBreed';
import { Pets4meCatBreedsService } from '../../common/services/Pets4meModelInstanceService';
import InfoCards from '../../common/components/Cards/InfoCards';
import ModelInstanceService from '../../common/services/ModelInstanceService';

interface CatBreedsInfoCardsProviders { catBreedService: ModelInstanceService<CatBreed> }

class CatBreedsInfoCards extends InfoCards<CatBreed> {
    static providers: CatBreedsInfoCardsProviders = { catBreedService: Pets4meCatBreedsService }

    getModelInstanceService = (): ModelInstanceService<CatBreed> => {
        return CatBreedsInfoCards.providers.catBreedService
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.filterString !== prevProps.filterString) {
            this.onPageChange(1);
        }
    }

    createInfoCard = (o: CatBreed, key: any): JSX.Element => {
        return <CatBreedCard searchWords={Array.from(this.state.searchParams.values())} key={`pet-card-${key}`} info={o} addToCompare={this.addToCompare} />
    }
}

export default CatBreedsInfoCards;