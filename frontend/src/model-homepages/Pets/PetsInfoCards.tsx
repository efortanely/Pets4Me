import React from 'react';
import Pets4mePetsServiceContext from '../../common/services/Pets4mePetsService';
import ModelInstanceService from '../../common/services/ModelInstanceService';
import InfoCards from '../../common/components/Cards/InfoCards';
import PetCard from '../../common/components/Cards/PetCard';
import { ObjectsPage } from '../../models/ObjectsPage';
import { Pet } from '../../models/Pet';

class PetsInfoCards extends InfoCards<Pet> {
    static contextType = Pets4mePetsServiceContext
    
    fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<Pet>> => {
        const pets4mePetsService: ModelInstanceService<Pet> = this.context
        return pets4mePetsService.getModelPageOfInstances(pageNumber)
    }

    createInfoCard = (o: Pet, key: any): JSX.Element => {
        return <PetCard key={`pet-card-${key}`} info={o} />
    }

    getPathName = (): string =>  {
        return '/pets'
    }
} export default PetsInfoCards