import Pets4meApiService from "./Pets4meApiService";
import { Shelter } from "../../models/Shelter";
import ModelInstanceService from "./ModelInstanceService";
import { ObjectsPage } from "../../models/ObjectsPage";
import { Pet } from "../../models/Pet";
import { DogBreed } from "../../models/DogBreed";
import { CatBreed } from "../../models/CatBreed";
import { GetPageOptions } from "./ModelInstanceService";

const endpoints = {
  shelters: "shelters",
  pets: "pets",
  dogBreeds: "dog_breeds",
  catBreeds: "cat_breeds",
};

class Pets4meModelInstanceService<T> implements ModelInstanceService<T> {
  endpoint: string;
  pets4meApiService = new Pets4meApiService();

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getModelPageOfInstances(
    pageNumber: number,
    options?: GetPageOptions
  ): Promise<ObjectsPage<T>> {
    return this.pets4meApiService.fetchJsonAsObject<ObjectsPage<T>>(
      this.endpoint,
      {
        page: pageNumber,
        results_per_page: options?.resultsPerPage,
        search: options?.search,
      },
      options?.filterString
    );
  }

  getInstanceById(id: string): Promise<T> {
    return this.pets4meApiService.fetchJsonAsObject<T>(
      `${this.endpoint}/${id}`
    );
  }
}

export const Pets4mePetsService: ModelInstanceService<Pet> = new Pets4meModelInstanceService<
  Pet
>(endpoints.pets);
export const Pets4meDogBreedsService: ModelInstanceService<DogBreed> = new Pets4meModelInstanceService<
  DogBreed
>(endpoints.dogBreeds);
export const Pets4meCatBreedsService: ModelInstanceService<CatBreed> = new Pets4meModelInstanceService<
  CatBreed
>(endpoints.catBreeds);
export const Pets4meSheltersService: ModelInstanceService<Shelter> = new Pets4meModelInstanceService<
  Shelter
>(endpoints.shelters);
