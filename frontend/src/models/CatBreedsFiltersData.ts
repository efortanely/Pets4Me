export interface CatBreedsFiltersData {
    name_initials: string[];
    lifespan_min: number;
    lifespan_max: number;
}

export let sampleFilterData = {
    name_initials: ["A", "B", "C"],
    lifespan_min: 0,
    lifespan_max: 25
} as CatBreedsFiltersData;
