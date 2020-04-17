export interface DogBreedsFiltersData {
    name_initials: string[];
    breeds: string[];
    breed_group: string[];
    max_height: number;
    min_height: number;
    max_weight: number;
    min_weight: number;
    lifespan_min: number;
    lifespan_max: number;
    updateFilters: any;
}

export let dogSampleFilterData = {
    name_initials: ["D", "O", "G"],
    breeds: ["Poodle"],
    breed_group: ["Hound"],
    min_height: 0,
    max_height: 4,
    min_weight: 5,
    max_weight: 20,
    lifespan_min: 6,
    lifespan_max: 9,
    updateFilters: (arg: any) => console.log("Filter callback not set!")
} as DogBreedsFiltersData;

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

