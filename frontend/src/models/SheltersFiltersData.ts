export interface SheltersFiltersData {
    cities: string[];
    states: string[];
    max_pets: number;
    max_distance: number;
}

export let sampleFilterData = {
    cities: ["Austin", "Amarillo", "El Paso"],
    states: ["Texas", "New Mexico", "Louisiana"],
    max_pets: 72,
    max_distance: 275
}