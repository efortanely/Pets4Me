import { DogBreed } from '../../models/dog-breed';

interface DogBreedsService {
  getDogBreeds(): Promise<DogBreed[]>
  getDogBreed(id: string): Promise<DogBreed>
}

export default DogBreedsService