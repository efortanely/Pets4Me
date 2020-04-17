import React from 'react';
import InfoCards from '../../common/components/Cards/InfoCards';
import { ObjectsPage } from '../../models/ObjectsPage';
import Pets4meSheltersServiceContext from '../../common/services/Pets4meSheltersService';
import { Shelter } from '../../models/Shelter';
import ShelterCard from '../../common/components/Cards/ShelterCard';
import ModelInstanceService from '../../common/services/ModelInstanceService';

class SheltersInfoCards extends InfoCards<Shelter> {
    static contextType = Pets4meSheltersServiceContext
    
    fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<Shelter>> => {
        const pets4meSheltersService: ModelInstanceService<Shelter> = this.context
        return pets4meSheltersService.getModelPageOfInstances(pageNumber)
    }

    createInfoCard = (o: Shelter, key: any): JSX.Element => {
        return <ShelterCard key={`shelter-card-${key}`} info={o} />
    }

    getPathName = (): string =>  {
        return '/shelters'
    }
}

export default SheltersInfoCards
