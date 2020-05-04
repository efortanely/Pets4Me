import { FilterOptions } from './FiltersData';

export interface DogBreedsFilterOptions extends FilterOptions {
    unique_letters: string[]
    dog_breeds: string[]
    breed_groups: string[]
    height_span: { max: number, min: number}
    weight_span: { max: number, min: number}
    life_span: { max: number, min: number}
}

export interface DogBreedsFiltersState {
    nameInitials: string[];
    breedGroup: string[];
    maxHeight: number;
    minHeight: number;
    maxWeight: number;
    minWeight: number;
    lifespanMin: number;
    lifespanMax: number;
    sortType: string | undefined;
    sortDir: string | undefined;
}

export let defaultFilterState = {
    nameInitials: [],
    breedGroup: [],
    maxHeight: 1000,
    minHeight: 0,
    maxWeight: 1000,
    minWeight: 0,
    lifespanMin: 0,
    lifespanMax: 1000,
    sortType: undefined,
    sortDir: "desc"
} as DogBreedsFiltersState;

