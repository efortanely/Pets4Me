import { Pet } from '../../models/Pet';
import { ObjectsPage } from '../../models/ObjectsPage';

interface PetsService {
  getPets(pageNumber: number): Promise<ObjectsPage<Pet>>
  getPet(id: string): Promise<Pet>
}

export default PetsService