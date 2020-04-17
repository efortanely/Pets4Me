import React from 'react';
import CatBreedCard from '../../common/components/Cards/CatBreedCard';
import { CatBreed } from '../../models/CatBreed';
import Pets4meCatBreedsServiceContext from '../../common/services/Pets4meCatBreedsService';
import InfoCards from '../../common/components/Cards/InfoCards';

class CatBreedsInfoCards extends InfoCards<CatBreed> {
    static contextType = Pets4meCatBreedsServiceContext

    componentDidUpdate(prevProps: any) {
        if (this.props.filterString !== prevProps.filterString) {
            this.onPageChange(1);
        }
    }

    createInfoCard = (o: CatBreed, key: any): JSX.Element => {
        return <CatBreedCard searchWords={Array.from(this.state.searchParams.values())} key={`pet-card-${key}`} info={o} />
    }
}

export default CatBreedsInfoCards;