import React from 'react'
import Pets4meApiService from './Pets4meApiService';
import SheltersService from './SheltersService'
import { Shelter } from '../../models/Shelter';
import { ObjectsPage } from '../../models/ObjectsPage';

export class Pets4meSheltersService implements SheltersService {
  private endpoint: string = 'shelters'
  pets4meApiService: Pets4meApiService

  constructor() {
    this.pets4meApiService = new Pets4meApiService()
  }

  getShelters(pageNumber: number): Promise<ObjectsPage<Shelter>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<Shelter>>(this.endpoint, { page: pageNumber })
  }

  getShelter(id: string): Promise<Shelter> {
    return this.pets4meApiService.fetchJsonAsObject<Shelter>(`${this.endpoint}/${id}`, { })
  }
}

const pets4meSheltersService: Pets4meSheltersService = new Pets4meSheltersService()

const Pets4meSheltersServiceContext = React.createContext<SheltersService>(pets4meSheltersService)

export default Pets4meSheltersServiceContext
