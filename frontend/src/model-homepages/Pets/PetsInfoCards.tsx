import React from 'react';
import Pets4mePetsServiceContext from '../../common/services/Pets4mePetsService';
import InfoCards from '../../common/components/Cards/InfoCards';
import PetCard from '../../common/components/Cards/PetCard';
import { Pet } from '../../models/Pet';

class PetsInfoCards extends InfoCards<Pet> {
    static contextType = Pets4mePetsServiceContext
    
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