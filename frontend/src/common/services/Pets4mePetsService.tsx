import React from 'react'
import Pets4meApiService from './Pets4meApiService';
import PetsService from './PetsService'
import { Pet } from '../../models/Pet';
import { ObjectsPage } from '../../models/ObjectsPage';
import { PetsFiltersData, sampleFilterData } from '../../models/PetsFiltersData'

export class Pets4mePetsService implements PetsService {
  private endpoint: string = 'pets'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getPets(pageNumber: number): Promise<ObjectsPage<Pet>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<Pet>>(this.endpoint, { page: pageNumber })
  }

  getPet(id: string): Promise<Pet> {
    return this.pets4meApiService.fetchJsonAsObject<Pet>(`${this.endpoint}/${id}`, { })
  }


  getPetMetadata(): Promise<PetsFiltersData> {
    
    return new Promise(function(response) {
      response(sampleFilterData);
    });
  }
}

const pets4mePetsService: Pets4mePetsService = new Pets4mePetsService()

const Pets4mePetsServiceContext = React.createContext<PetsService>(pets4mePetsService)

export default Pets4mePetsServiceContext