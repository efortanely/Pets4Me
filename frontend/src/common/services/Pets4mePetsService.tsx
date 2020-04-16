import React from 'react'
import Pets4meApiService from './Pets4meApiService';
import ModelInstanceService from './ModelInstanceService'
import { Pet } from '../../models/Pet';
import { ObjectsPage } from '../../models/ObjectsPage';
import { PetsFiltersData, sampleFilterData } from '../../models/PetsFiltersData'

export class Pets4mePetsService implements ModelInstanceService<Pet> {
  private endpoint: string = 'pets'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getModelPageOfInstances(pageNumber: number, search: string = ''): Promise<ObjectsPage<Pet>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<Pet>>(this.endpoint, { page: pageNumber, search: search })
  }

  getInstanceById(id: string): Promise<Pet> {
    return this.pets4meApiService.fetchJsonAsObject<Pet>(`${this.endpoint}/${id}`, { })
  }
}

const pets4mePetsService: Pets4mePetsService = new Pets4mePetsService()

const Pets4mePetsServiceContext = React.createContext<ModelInstanceService<Pet>>(pets4mePetsService)

export default Pets4mePetsServiceContext