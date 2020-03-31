import { Pet } from '../../models/pet';

interface PetsService {
  getPets(): Promise<Pet[]>
  getPet(id: string): Promise<Pet>
}

export default PetsService