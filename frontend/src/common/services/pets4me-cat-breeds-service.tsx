import React from 'react'
import Pets4meApiService from './pets4me-api-service';
import CatBreedsService from './cat-breeds-service'
import { CatBreed } from '../../models/cat-breed';

export class Pets4meCatBreedsService implements CatBreedsService {
  private endpoint: string = 'cat_breeds'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getCatBreeds(): Promise<CatBreed[]> {
    return this.pets4meApiService.fetchJsonAsObject<CatBreed[]>(this.endpoint, { })
  }

  getCatBreed(id: string): Promise<CatBreed> {
    return this.pets4meApiService.fetchJsonAsObject<CatBreed>(`${this.endpoint}/${id}`, { })
  }
}

const pets4meCatBreedsService: Pets4meCatBreedsService = new Pets4meCatBreedsService()

const Pets4meCatBreedsServiceContext = React.createContext<Pets4meCatBreedsService>(pets4meCatBreedsService)

export default Pets4meCatBreedsServiceContext
