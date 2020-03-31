import React from 'react'
import Pets4meApiService from './pets4me-api-service';
import PetsService from './pets-service'
import { Pet } from '../../models/pet';

export class Pets4mePetsService implements PetsService {
  private endpoint: string = 'pets'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getPets(): Promise<Pet[]> {
    return this.pets4meApiService.fetchJsonAsObject<Pet[]>(this.endpoint, { })
  }

  getPet(id: string): Promise<Pet> {
    return this.pets4meApiService.fetchJsonAsObject<Pet>(`${this.endpoint}/${id}`, { })
  }
}

const pets4mePetsService: Pets4mePetsService = new Pets4mePetsService()

const Pets4mePetsServiceContext = React.createContext<Pets4mePetsService>(pets4mePetsService)

export default Pets4mePetsServiceContext