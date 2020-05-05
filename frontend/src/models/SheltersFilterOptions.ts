import { FilterOptions } from "./FiltersData";

export interface SheltersFilterOptions extends FilterOptions {
  cities: string[];
  states: string[];
  num_pets: number;
  max_distance: number;
}

export interface SheltersFiltersState {
  city: string[];
  postcode: number;
  state: string[];
  distanceMax: number;
  shelterWithSpecies: string;
  sortType: string | undefined;
  sortDir: string | undefined;
}

export let defaultFilterState = {
  city: [],
  postcode: 0,
  state: [],
  distanceMax: 1000,
  shelterWithSpecies: "",
  sortType: undefined,
  sortDir: "desc",
} as SheltersFiltersState;
