import { Shelter } from '../../models/Shelter';
import { ObjectsPage } from '../../models/ObjectsPage';

interface SheltersService {
  getShelters(pageNumber: number, filterString: string): Promise<ObjectsPage<Shelter>>
  getShelter(id: string): Promise<Shelter>
}

export default SheltersService
