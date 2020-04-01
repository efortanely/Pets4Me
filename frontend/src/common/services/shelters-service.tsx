import { Shelter } from '../../models/shelter';

interface SheltersService {
  getShelters(): Promise<Shelter[]>
  getShelter(id: string): Promise<Shelter>
}

export default SheltersService
