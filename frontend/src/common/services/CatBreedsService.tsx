import { CatBreed } from '../../models/CatBreed';
import { ObjectsPage } from '../../models/ObjectsPage';

interface CatBreedsService {
  getCatBreeds(pageNumber: number, filterString: string): Promise<ObjectsPage<CatBreed>>
  getCatBreed(id: string): Promise<CatBreed>
}

export default CatBreedsService
