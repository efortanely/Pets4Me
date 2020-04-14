import React from 'react';
import InfoCards from '../../common/components/Cards/InfoCards';
import { ObjectsPage } from '../../models/ObjectsPage';
import Pets4meSheltersServiceContext from '../../common/services/Pets4meSheltersService';
import { Shelter } from '../../models/Shelter';
import ShelterCard from '../../common/components/Cards/ShelterCard';
import SheltersService from '../../common/services/SheltersService';
import { SheltersFiltersState } from '../../models/SheltersFiltersData'

class SheltersInfoCards extends InfoCards<Shelter> {
    static contextType = Pets4meSheltersServiceContext

    componentDidUpdate(prevProps: any) {
        if (this.props.filters !== prevProps.filters) {
            this.onPageChange(1);
        }
    }

    fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<Shelter>> => {
        const pets4meSheltersService: SheltersService = this.context
        return pets4meSheltersService.getShelters(pageNumber, this.getFilterString(this.props.filters))
    }

    getFilterString(filters: SheltersFiltersState): string {
        console.log("creating string with these filters:", filters);
        return '';
    }

    createInfoCard = (o: Shelter, key: any): JSX.Element => {
        return <ShelterCard key={`shelter-card-${key}`} info={o} />
    }

    getPathName = (): string =>  {
        return '/shelters'
    }
} export default SheltersInfoCards;
