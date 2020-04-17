import React from 'react'
import Pets4meApiService from './Pets4meApiService';
import { Shelter } from '../../models/Shelter';
import { ObjectsPage } from '../../models/ObjectsPage';
import ModelInstanceService from './ModelInstanceService';

export class Pets4meSheltersService implements ModelInstanceService<Shelter> {
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

const pets4meSheltersService: Pets4meSheltersService = new Pets4meSheltersService()

const Pets4meSheltersServiceContext = React.createContext<ModelInstanceService<Shelter>>(pets4meSheltersService)

export default Pets4meSheltersServiceContext
