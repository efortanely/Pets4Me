import React from 'react';
import { DogBreedCard } from '../../common/components/Cards/DogBreedCard';
import { DogBreed } from '../../models/DogBreed';
import Pets4meDogBreedsServiceContext from '../../common/services/Pets4meDogBreedsService';
import InfoCards from '../../common/components/Cards/InfoCards';

class DogBreedsInfoCards extends InfoCards<DogBreed> {
    static contextType = Pets4meDogBreedsServiceContext

    componentDidUpdate(prevProps: any) {
        if (this.props.filterString !== prevProps.filterString) {
            this.onPageChange(1);
        }
    }

    createInfoCard = (o: DogBreed, key: any): JSX.Element => {
        return <DogBreedCard searchWords={Array.from(this.state.searchParams.values())} key={`pet-card-${key}`} info={o} />
    }
}

export default DogBreedsInfoCards