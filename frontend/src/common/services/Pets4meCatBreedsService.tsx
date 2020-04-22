import Pets4meApiService from './Pets4meApiService';
import { CatBreed } from '../../models/CatBreed';
import { ObjectsPage } from '../../models/ObjectsPage';
import ModelInstanceService from './ModelInstanceService';

class Pets4meCatBreedsServiceImpl implements ModelInstanceService<CatBreed> {
  private endpoint: string = 'cat_breeds'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getModelPageOfInstances(pageNumber: number, search: string = '',  filterString: string = ''): Promise<ObjectsPage<CatBreed>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<CatBreed>>(this.endpoint, { page: pageNumber, search: search }, filterString)
  }

  getInstanceById(id: string): Promise<CatBreed> {
    return this.pets4meApiService.fetchJsonAsObject<CatBreed>(`${this.endpoint}/${id}`, { })
  }
}

const Pets4meCatBreedsService: Pets4meCatBreedsServiceImpl = new Pets4meCatBreedsServiceImpl()

export default Pets4meCatBreedsService
