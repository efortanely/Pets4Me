import { FilterOptions } from "./FiltersData";

export interface CatBreedsFilterOptions extends FilterOptions {
  unique_letters: string[];
  cat_breeds: string[];
  life_span: { min: number; max: number };
}

export interface CatBreedsFiltersState {
  nameInitials: string[];
  doorsiness: string | undefined;
  dogLevel: number;
  childLevel: number;
  groomingLevel: number;
  minLifespan: number;
  maxLifespan: number;
  sortType: string | undefined;
  sortDir: string | undefined;
}

export let defaultFilterState = {
  nameInitials: [],
  doorsiness: undefined,
  dogLevel: 0,
  childLevel: 0,
  groomingLevel: 0,
  minLifespan: 0,
  maxLifespan: 30,
  sortType: undefined,
  sortDir: "desc",
} as CatBreedsFiltersState;
