import React from 'react';
import InfoCards from '../../common/components/Cards/InfoCards';
import PetCard from '../../common/components/Cards/PetCard';
import { Pet } from '../../models/Pet';
import ModelInstanceService from '../../common/services/ModelInstanceService';
import { Pets4mePetsService } from '../../common/services/Pets4meModelInstanceService';

interface PetsInfoCardsProviders { petsService: ModelInstanceService<Pet> }

class PetsInfoCards extends InfoCards<Pet> {
    static providers: PetsInfoCardsProviders = { petsService: Pets4mePetsService }
    
    getModelInstanceService = (): ModelInstanceService<Pet> => {
        return PetsInfoCards.providers.petsService
    }
    
    componentDidUpdate(prevProps: any) {
        if (this.props.filterString !== prevProps.filterString) {
            this.onPageChange(1);
        }
    }

    createInfoCard = (o: Pet, key: any): JSX.Element => {
        return <PetCard searchWords={Array.from(this.state.searchParams.values())} key={`pet-card-${key}`} info={o} />
    }
} 

export default PetsInfoCards