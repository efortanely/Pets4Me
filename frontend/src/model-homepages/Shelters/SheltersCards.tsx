import React from 'react';
import InfoCards from '../../common/components/Cards/InfoCards';
import { ObjectsPage } from '../../models/ObjectsPage';
import Pets4meSheltersServiceContext from '../../common/services/pets4me-shelters-service';
import { Shelter } from '../../models/shelter';
import ShelterCard from '../../common/components/Cards/ShelterCard';
import SheltersService from '../../common/services/shelters-service';

class SheltersInfoCards extends InfoCards<Shelter> {
    static contextType = Pets4meSheltersServiceContext
    
    fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<Shelter>> => {
        const pets4meSheltersService: SheltersService = this.context
        return pets4meSheltersService.getShelters(pageNumber)
    }

    createInfoCard = (o: Shelter, key: any): JSX.Element => {
        return <ShelterCard key={`shelter-card-${key}`} shelter={o} />
    }

    getPathName = (): string =>  {
        return '/shelters'
    }
}

export default SheltersInfoCards
