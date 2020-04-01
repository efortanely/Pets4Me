import { DogBreed } from '../../models/dog-breed';
import { ObjectsPage } from '../../models/ObjectsPage';

interface DogBreedsService {
  getDogBreeds(pageNumber: number): Promise<ObjectsPage<DogBreed>>
  getDogBreed(id: string): Promise<DogBreed>
}

export default DogBreedsService