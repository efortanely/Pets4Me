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
}

export let sampleFilterData = {
    name_initials: ["D", "O", "G"],
    breeds: ["Dragon king", "Poodle"],
    breed_group: ["fun", "funner", "funnest"],
    min_height: 0,
    max_height: 4,
    min_weight: 5,
    max_weight: 20,
    lifespan_min: 6,
    lifespan_max: 9
} as DogBreedsFiltersData;
