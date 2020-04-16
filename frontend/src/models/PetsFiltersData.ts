export interface PetsFiltersData {
    dogBreeds: string[];
    catBreeds: string[];
    colors: string[];
    sizes: string[]
    ages: string[];
    max_distance: number;
}

export let sampleFilterData = {
    dogBreeds: ["Maltese", "Poodle"],
    catBreeds: ["Domestic Shorthair", "Tabby"],
    colors: ["Green", "Fuchsia"],
    sizes: ["Small", "Medium", "Large"],
    ages: ["Baby", "Puppy", "Adult"],
    max_distance: 20
} as PetsFiltersData;
