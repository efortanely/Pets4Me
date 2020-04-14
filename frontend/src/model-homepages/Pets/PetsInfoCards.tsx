import React from 'react';
import Pets4mePetsServiceContext from '../../common/services/Pets4mePetsService';
import PetsService from '../../common/services/PetsService';
import InfoCards from '../../common/components/Cards/InfoCards';
import PetCard from '../../common/components/Cards/PetCard';
import { ObjectsPage } from '../../models/ObjectsPage';
import { Pet } from '../../models/Pet';
import { PetsFiltersState } from '../../models/PetsFiltersData';

class PetsInfoCards extends InfoCards<Pet> {
    static contextType = Pets4mePetsServiceContext
    
    componentDidUpdate(prevProps: any) {
        if (this.props.filters !== prevProps.filters) {
            this.onPageChange(1);
        }
    }

    fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<Pet>> => {
        const pets4meDogBreedService: PetsService = this.context
        return pets4meDogBreedService.getPets(pageNumber, this.getFilterString(this.props.filters))
    }

    getFilterString(filters: PetsFiltersState): string {
        console.log("creating string with these filters:", filters);
        return '';
    }

    createInfoCard = (o: Pet, key: any): JSX.Element => {
        return <PetCard key={`pet-card-${key}`} info={o} />
    }

    getPathName = (): string =>  {
        return '/pets'
    }
} export default PetsInfoCards