import React from 'react'
import Pets4meApiService from './Pets4meApiService';
import DogBreedsService from './DogBreedsService'
import { DogBreed } from '../../models/DogBreed';
import { ObjectsPage } from '../../models/ObjectsPage';

export class Pets4meDogBreedsService implements DogBreedsService {
  private endpoint: string = 'dog_breeds'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getDogBreeds(pageNumber: number): Promise<ObjectsPage<DogBreed>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<DogBreed>>(this.endpoint, { page: pageNumber })
  }

  getDogBreed(id: string): Promise<DogBreed> {
    return this.pets4meApiService.fetchJsonAsObject<DogBreed>(`${this.endpoint}/${id}`, { })
  }
}

const pets4meDogBreedsService: Pets4meDogBreedsService = new Pets4meDogBreedsService()

const Pets4meDogBreedsServiceContext = React.createContext<DogBreedsService>(pets4meDogBreedsService)

export default Pets4meDogBreedsServiceContext