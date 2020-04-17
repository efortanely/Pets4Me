import React from 'react';
import CatBreedCard from '../../common/components/Cards/CatBreedCard';
import { CatBreed } from '../../models/CatBreed';
import Pets4meCatBreedsServiceContext from '../../common/services/Pets4meCatBreedsService';
import InfoCards from '../../common/components/Cards/InfoCards';
import { ObjectsPage } from '../../models/ObjectsPage';
import ModelInstanceService from '../../common/services/ModelInstanceService';

class CatBreedsInfoCards extends InfoCards<CatBreed> {
    static contextType = Pets4meCatBreedsServiceContext

    componentDidUpdate(prevProps: any) {
        if (this.props.filterString !== prevProps.filterString) {
            this.onPageChange(1);
        }
    }
    
    fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<CatBreed>> => {
        const pets4meDogBreedService: ModelInstanceService<CatBreed> = this.context
        return pets4meDogBreedService.getModelPageOfInstances(pageNumber, undefined, this.props.filterString)
    }

    createInfoCard = (o: CatBreed, key: any): JSX.Element => {
        return <CatBreedCard searchWords={this.props.searchWords} key={`pet-card-${key}`} info={o} />
    }

    getPathName = (): string =>  {
        return '/cat-breeds'
    }
}

export default CatBreedsInfoCards;
