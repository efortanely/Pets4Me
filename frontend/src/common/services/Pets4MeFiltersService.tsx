import FilterOptionsService from './FiltersService';
import ApiService from './ApiService';
import Pets4meApiService from './Pets4meApiService';
import { FilterOptions } from '../../models/FiltersData';
import { PetsFilterOptions } from '../../models/PetsFilterOptions';
import { DogBreedsFilterOptions } from '../../models/DogBreedsFilterOptions';
import { SheltersFilterOptions } from '../../models/SheltersFilterOptions';
import { CatBreedsFilterOptions } from '../../models/CatBreedsFilterOptions';

interface FilterOptionsResponse { pets: PetsFilterOptions, dog_breeds: DogBreedsFilterOptions, cat_breeds: CatBreedsFilterOptions, shelters: SheltersFilterOptions }

class Pets4meFilterOptionsService<T extends FilterOptions> implements FilterOptionsService<T> {
  endpoint = "filter"
  pets4meApiService: ApiService = new Pets4meApiService()
  handleResponse: (res: FilterOptionsResponse) => T

  constructor(handleResponse: (res: FilterOptionsResponse) => T) {
    this.handleResponse = handleResponse
  }
  
  getFilterOptions(): Promise<T> {
    return this.pets4meApiService.fetchJsonAsObject<FilterOptionsResponse>(this.endpoint, { })
      .then((res: FilterOptionsResponse) => this.handleResponse(res))
  }
}

export const Pets4mePetsFilterOptionsService: FilterOptionsService<PetsFilterOptions> = new Pets4meFilterOptionsService<PetsFilterOptions>((res: FilterOptionsResponse) => res.pets)
export const Pets4meDogBreedsFilterOptionsService: FilterOptionsService<DogBreedsFilterOptions> = new Pets4meFilterOptionsService<DogBreedsFilterOptions>((res: FilterOptionsResponse) => res.dog_breeds)
export const Pets4meCatBreedsFilterOptionsService: FilterOptionsService<CatBreedsFilterOptions> = new Pets4meFilterOptionsService<CatBreedsFilterOptions>((res: FilterOptionsResponse) => res.cat_breeds)
export const Pets4meSheltersFilterOptionsService: FilterOptionsService<SheltersFilterOptions> = new Pets4meFilterOptionsService<SheltersFilterOptions>((res: FilterOptionsResponse) => res.shelters)