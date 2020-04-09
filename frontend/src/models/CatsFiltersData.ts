export interface CatsFiltersData {
    name_initials: string[];
    lifespan_min: number;
    lifespan_max: number;
}

export let sampleFilterData = {
    name_initials: ["A", "B", "C"],
    lifespan_min: 6,
    lifespan_max: 15
} as CatsFiltersData;