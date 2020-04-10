import React from 'react'
import Pets4meApiService from './Pets4meApiService';
import CatBreedsService from './CatBreedsService'
import { CatBreed } from '../../models/CatBreed';
import { ObjectsPage } from '../../models/ObjectsPage';
import { CatBreedsFiltersData, sampleFilterData } from '../../models/CatBreedsFiltersData';

export class Pets4meCatBreedsService implements CatBreedsService {
  private endpoint: string = 'cat_breeds'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getCatBreeds(pageNumber: number): Promise<ObjectsPage<CatBreed>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<CatBreed>>(this.endpoint, { page: pageNumber })
  }

  getCatBreed(id: string): Promise<CatBreed> {
    return this.pets4meApiService.fetchJsonAsObject<CatBreed>(`${this.endpoint}/${id}`, { })
  }

  getCatBreedMetadata(): Promise<CatBreedsFiltersData> {
    return new Promise(function(response) {
      response(sampleFilterData);
    });
  }
}

const pets4meCatBreedsService: Pets4meCatBreedsService = new Pets4meCatBreedsService()

const Pets4meCatBreedsServiceContext = React.createContext<Pets4meCatBreedsService>(pets4meCatBreedsService)

export default Pets4meCatBreedsServiceContext
