import React from 'react';
import InfoCards from '../../common/components/Cards/InfoCards';
import Pets4meSheltersServiceContext from '../../common/services/Pets4meSheltersService';
import { Shelter } from '../../models/Shelter';
import ShelterCard from '../../common/components/Cards/ShelterCard';
class SheltersInfoCards extends InfoCards<Shelter> {
    static contextType = Pets4meSheltersServiceContext

    componentDidUpdate(prevProps: any) {
        if (this.props.filterString !== prevProps.filterString) {
            this.onPageChange(1);
        }
    }

    createInfoCard = (o: Shelter, key: any): JSX.Element => {
        return <ShelterCard searchWords={Array.from(this.state.searchParams.values())} key={`shelter-card-${key}`} info={o} />
    }
}

export default SheltersInfoCards
