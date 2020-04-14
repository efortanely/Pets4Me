import React from 'react';
import { ObjectsPage } from '../../models/ObjectsPage';
import { DogBreedCard } from '../../common/components/Cards/DogBreedCard';
import { DogBreed } from '../../models/DogBreed';
import Pets4meDogBreedsServiceContext from '../../common/services/Pets4meDogBreedsService';
import DogBreedsService from '../../common/services/DogBreedsService';
import InfoCards from '../../common/components/Cards/InfoCards';
import { DogBreedsFiltersState } from '../../models/DogBreedsFiltersData';

class DogBreedsInfoCards extends InfoCards<DogBreed> {
    static contextType = Pets4meDogBreedsServiceContext

    componentDidUpdate(prevProps: any) {
        if (this.props.filters !== prevProps.filters) {
            this.onPageChange(1);
        }
    }
    
    fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<DogBreed>> => {
        const pets4meDogBreedService: DogBreedsService = this.context
        return pets4meDogBreedService.getDogBreeds(pageNumber, this.getFilterString(this.props.filters))
    }

    getFilterString(filters: DogBreedsFiltersState): string {
        console.log("creating string with these filters:", filters);
        return '';
    }

    createInfoCard = (o: DogBreed, key: any): JSX.Element => {
        return <DogBreedCard key={`pet-card-${key}`} info={o} />
    }

    getPathName = (): string =>  {
        return '/dog-breeds'
    }
}

export default DogBreedsInfoCards