import { CatBreed } from '../../models/cat-breed';

interface CatBreedsService {
  getCatBreeds(): Promise<CatBreed[]>
  getCatBreed(id: string): Promise<CatBreed>
}

export default CatBreedsService
