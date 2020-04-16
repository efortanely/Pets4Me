export interface CatBreedsFiltersData {
    name_initials: string[];
    breeds: string[];
    lifespan_min: number;
    lifespan_max: number;
    updateFilters: any;
}

export let sampleFilterData = {
    name_initials: ["A", "B", "C"],
    breeds: ["Beast of the night", "gary"],
    lifespan_min: 6,
    lifespan_max: 15,
    updateFilters: (arg: any) => console.log("Filter callback not set!")
} as CatBreedsFiltersData;

export interface CatBreedsFiltersState {
    nameInitials: string[] | undefined;
    doorsiness: string | undefined;
    dogLevel: number;
    childLevel: number;
    groomingLevel: number;
    minLifespan: number;
    maxLifespan: number;
    sortType: string | undefined;
    sortDir: string | undefined;
}

export let defaultFilterState = {
    nameInitials: [],
    doorsiness: undefined,
    dogLevel: 0,
    childLevel: 0,
    groomingLevel: 0,
    minLifespan: 0,
    maxLifespan: 30,
    sortType: undefined,
    sortDir: "desc"
} as CatBreedsFiltersState;
