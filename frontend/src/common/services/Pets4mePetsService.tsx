import Pets4meApiService from './Pets4meApiService';
import ModelInstanceService from './ModelInstanceService'
import { Pet } from '../../models/Pet';
import { ObjectsPage } from '../../models/ObjectsPage';

class Pets4mePetsServiceImpl implements ModelInstanceService<Pet> {
  private endpoint: string = 'pets'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getModelPageOfInstances(pageNumber: number, search: string = '', filterString: string = ''): Promise<ObjectsPage<Pet>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<Pet>>(this.endpoint, { page: pageNumber, search: search }, filterString)
  }

  getInstanceById(id: string): Promise<Pet> {
    return this.pets4meApiService.fetchJsonAsObject<Pet>(`${this.endpoint}/${id}`, { })
  }
}

const Pets4mePetsService: Pets4mePetsServiceImpl = new Pets4mePetsServiceImpl()

export default Pets4mePetsService