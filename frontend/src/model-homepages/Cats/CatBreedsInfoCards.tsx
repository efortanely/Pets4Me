import React from 'react';
import CatBreedCard from '../../common/components/Cards/CatBreedCard';
import { CatBreed } from '../../models/CatBreed';
import CatBreedsService from '../../common/services/CatBreedsService';
import Pets4meCatBreedsServiceContext from '../../common/services/Pets4meCatBreedsService';
import InfoCards from '../../common/components/Cards/InfoCards';
import { ObjectsPage } from '../../models/ObjectsPage';
import { CatBreedsFiltersState } from '../../models/CatBreedsFiltersData';

class CatBreedsInfoCards extends InfoCards<CatBreed> {
    static contextType = Pets4meCatBreedsServiceContext

    componentDidUpdate(prevProps: any) {
        if (this.props.filters !== prevProps.filters) {
            this.onPageChange(1);
        }
    }
    
    fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<CatBreed>> => {
        const pets4meDogBreedService: CatBreedsService = this.context
        return pets4meDogBreedService.getCatBreeds(pageNumber, this.getFilterString(this.props.filters))
    }

    getFilterString(filters: CatBreedsFiltersState): string {
        console.log("creating string with these filters:", filters);
        return 'test';
    }

    createInfoCard = (o: CatBreed, key: any): JSX.Element => {
        return <CatBreedCard key={`pet-card-${key}`} info={o} />
    }

    getPathName = (): string =>  {
        return '/cat-breeds'
    }
}

export default CatBreedsInfoCards;
