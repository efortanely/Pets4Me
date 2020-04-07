export interface PetsFiltersData {
    breeds: string[];
    colors: string[];
    sizes: string[]
    ages: string[];
    max_distance: number;
}

export let sampleFilterData = {
    breeds: ["Maltese", "Poodle"],
    colors: ["Green", "Fuchsia"],
    sizes: ["Small", "Medium", "Large"],
    ages: ["Baby", "Puppy", "Adult"],
    max_distance: 20
} as PetsFiltersData;
