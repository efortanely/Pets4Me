import Pets4meApiService from './Pets4meApiService';
import { Shelter } from '../../models/Shelter';
import { ObjectsPage } from '../../models/ObjectsPage';
import ModelInstanceService from './ModelInstanceService';

class Pets4meSheltersServiceImpl implements ModelInstanceService<Shelter> {
  private endpoint: string = 'shelters'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getModelPageOfInstances(pageNumber: number, search: string = '', filterString: string = ''): Promise<ObjectsPage<Shelter>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<Shelter>>(this.endpoint, { page: pageNumber, search: search }, filterString)
  }

  getInstanceById(id: string): Promise<Shelter> {
    return this.pets4meApiService.fetchJsonAsObject<Shelter>(`${this.endpoint}/${id}`, { })
  }
}

const Pets4meSheltersService: ModelInstanceService<Shelter> = new Pets4meSheltersServiceImpl()

export default Pets4meSheltersService
