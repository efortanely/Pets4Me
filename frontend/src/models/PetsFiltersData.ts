export interface PetsFiltersData {
    dogBreeds: string[];
    catBreeds: string[];
    colors: string[];
    sizes: string[]
    ages: string[];
    max_distance: number;
    updateFilters: any;
}

export interface PetsFiltersState {
    species: string | undefined;
    gender: string | undefined;
    primaryBreed: string[];
    secondaryBreed: string[];
    color: string[];
    size: string[];
    age: string[];
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
    distanceMax: 1000,
    sortType: undefined,
    sortDir: "desc"
} as PetsFiltersState;

export let petSampleFilterData = {
    dogBreeds: ["Maltese", "Poodle"],
    catBreeds: ["Domestic Shorthair", "Tabby"],
    colors: ["Green", "Fuchsia"],
    sizes: ["Small", "Medium", "Large"],
    ages: ["Baby", "Puppy", "Adult"],
    max_distance: 20,
    updateFilters: (arg: any) => console.log("Filter callback not set!")
}