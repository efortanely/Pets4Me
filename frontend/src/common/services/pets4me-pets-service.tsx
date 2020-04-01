import React from 'react'
import Pets4meApiService from './pets4me-api-service';
import PetsService from './pets-service'
import { Pet } from '../../models/pet';
import { ObjectsPage } from '../../models/ObjectsPage';

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
}

const pets4mePetsService: Pets4mePetsService = new Pets4mePetsService()

const Pets4mePetsServiceContext = React.createContext<PetsService>(pets4mePetsService)

export default Pets4mePetsServiceContext