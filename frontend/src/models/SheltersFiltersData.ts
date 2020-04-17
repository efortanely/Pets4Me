export interface SheltersFiltersData {
    cities: string[];
    states: string[];
    max_pets: number;
    max_distance: number;
    updateFilters: any;
}

export let shelterSampleFilterData = {
    cities: ["Austin", "Amarillo", "El Paso"],
    states: ["Texas", "New Mexico", "Louisiana"],
    max_pets: 72,
    max_distance: 275,
    updateFilters: (arg: any) => console.log("Filter callback not set!")
} as SheltersFiltersData;

export interface SheltersFiltersState {
    city: string[];
    postcode: number;
    state: string[];
    distanceMax: number;
    shelterWithSpecies: string;
    sortType: string | undefined;
    sortDir: string | undefined;
}

export let defaultFilterState = {
    city: [],
    postcode: 0,
    state: [],
    distanceMax: 1000,
    shelterWithSpecies: "",
    sortType: undefined,
    sortDir: "desc"
} as SheltersFiltersState;
