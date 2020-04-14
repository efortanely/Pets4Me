import React from 'react'
import Pets4meApiService from './Pets4meApiService';
import { DogBreed } from '../../models/DogBreed';
import { ObjectsPage } from '../../models/ObjectsPage';
import ModelInstanceService from './ModelInstanceService';

export class Pets4meDogBreedsService implements ModelInstanceService<DogBreed> {
  private endpoint: string = 'dog_breeds'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getModelPageOfInstances(pageNumber: number, search: string =''): Promise<ObjectsPage<DogBreed>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<DogBreed>>(this.endpoint, { page: pageNumber, q: search })
  }

  getInstanceById(id: string): Promise<DogBreed> {
    return this.pets4meApiService.fetchJsonAsObject<DogBreed>(`${this.endpoint}/${id}`, { })
  }
}

const pets4meDogBreedsService: Pets4meDogBreedsService = new Pets4meDogBreedsService()

const Pets4meDogBreedsServiceContext = React.createContext<ModelInstanceService<DogBreed>>(pets4meDogBreedsService)

export default Pets4meDogBreedsServiceContext