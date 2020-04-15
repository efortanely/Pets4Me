export interface DogBreedsFiltersData {
    name_initials: string[];
    breed_group: string[];
    max_height: number;
    min_height: number;
    max_weight: number;
    min_weight: number;
    lifespan_min: number;
    lifespan_max: number;
}

export let sampleFilterData = {
    name_initials: ["D", "O", "G"],
    breed_group: ["fun", "funner", "funnest"],
    min_height: 0,
    max_height: 60,
    min_weight: 0,
    max_weight: 1000,
    lifespan_min: 0,
    lifespan_max: 25
} as DogBreedsFiltersData;
