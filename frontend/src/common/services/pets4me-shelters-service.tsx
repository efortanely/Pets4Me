import React from 'react'
import Pets4meApiService from './pets4me-api-service';
import SheltersService from './shelters-service'
import { Shelter } from '../../models/shelter';

export class Pets4meSheltersService implements SheltersService {
  private endpoint: string = 'shelters'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getShelters(): Promise<Shelter[]> {
    return this.pets4meApiService.fetchJsonAsObject<Shelter[]>(this.endpoint, { })
  }

  getShelter(id: string): Promise<Shelter> {
    return this.pets4meApiService.fetchJsonAsObject<Shelter>(`${this.endpoint}/${id}`, { })
  }
}

const pets4meSheltersService: Pets4meSheltersService = new Pets4meSheltersService()

const Pets4meSheltersServiceContext = React.createContext<Pets4meSheltersService>(pets4meSheltersService)

export default Pets4meSheltersServiceContext
