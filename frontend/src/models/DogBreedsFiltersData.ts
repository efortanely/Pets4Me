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
    max_height: 4,
    max_weight: 20,
    lifespan_min: 6,
    lifespan_max: 9
} as DogBreedsFiltersData;
