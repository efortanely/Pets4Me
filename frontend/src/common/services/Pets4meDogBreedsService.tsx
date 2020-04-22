import Pets4meApiService from './Pets4meApiService';
import { DogBreed } from '../../models/DogBreed';
import { ObjectsPage } from '../../models/ObjectsPage';
import ModelInstanceService from './ModelInstanceService';

class Pets4meDogBreedsServiceImpl implements ModelInstanceService<DogBreed> {
  private endpoint: string = 'dog_breeds'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getModelPageOfInstances(pageNumber: number, search: string ='', filterString: string = ''): Promise<ObjectsPage<DogBreed>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<DogBreed>>(this.endpoint, { page: pageNumber, search: search }, filterString)
  }

  getInstanceById(id: string): Promise<DogBreed> {
    return this.pets4meApiService.fetchJsonAsObject<DogBreed>(`${this.endpoint}/${id}`, { })
  }
}

const Pets4meDogBreedsService: ModelInstanceService<DogBreed> = new Pets4meDogBreedsServiceImpl()

export default Pets4meDogBreedsService