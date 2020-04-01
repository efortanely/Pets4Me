import { Shelter } from '../../models/shelter';
import { ObjectsPage } from '../../models/ObjectsPage';

interface SheltersService {
  getShelters(pageNumber: number): Promise<ObjectsPage<Shelter>>
  getShelter(id: string): Promise<Shelter>
}

export default SheltersService
