import { DogBreed } from '../../models/dog-breed';
import { DogBreedsPage } from '../../models/dog-breeds-page';

interface DogBreedsService {
  getDogBreeds(pageNumber?: number): Promise<DogBreedsPage>
  getDogBreed(id: string): Promise<DogBreed>
}

export default DogBreedsService