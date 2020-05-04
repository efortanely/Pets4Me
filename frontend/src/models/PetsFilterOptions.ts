import { FilterOptions } from './FiltersData';

export interface PetsFilterOptions extends FilterOptions {
    dog_breeds: string[];
    cat_breeds: string[];
    colors: string[];
    sizes: string[]
    ages: string[];
    max_distance: number;
}

export interface PetsFiltersState {
    species: string | undefined;
    gender: string | undefined;
    primaryBreed: string[];
    secondaryBreed: string[];
    color: string[];
    size: string[];
    age: string[];
    postcode: number;
    distanceMax: number;
    sortType: string | undefined;
    sortDir: string | undefined;
}

export let defaultFilterState = {
    species: undefined,
    gender: undefined,
    primaryBreed: [],
    secondaryBreed: [],
    color: [],
    size: [],
    age: [],
    postcode: 0,
    distanceMax: 1000,
    sortType: undefined,
    sortDir: "desc"
} as PetsFiltersState;