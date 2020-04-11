export interface DogBreedsFiltersData {
    name_initials: string[];
    breed_group: string[];
    max_height: number;
    min_height: number;
    max_weight: number;
    min_weight: number;
    lifespan_min: number;
    lifespan_max: number;
    updateFilters: any;
}

export interface DogBreedsFiltersState {
    nameInitials: string[] | undefined;
    breedGroup: string[] | undefined;
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
    maxHeight: 100,
    minHeight: 0,
    maxWeight: 100,
    minWeight: 0,
    lifespanMin: 0,
    lifespanMax: 100,
    sortType: undefined,
    sortDir: undefined
} as DogBreedsFiltersState;

export let sampleFilterData = {
    name_initials: ["D", "O", "G"],
    breed_group: ["fun", "funner", "funnest"],
    min_height: 0,
    max_height: 4,
    min_weight: 5,
    max_weight: 20,
    lifespan_min: 6,
    lifespan_max: 9,
    updateFilters: (arg: any) => console.log("Filter callback not set!")
} as DogBreedsFiltersData;
