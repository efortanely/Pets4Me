export interface PetsFiltersData {
    breeds: string[];
    colors: string[];
    size_low: number;
    size_high: number;
    age_low: number;
    age_high: number;
    max_distance: number;
}

export let sampleFilterData = {
    breeds: ["breed1", "breed2"],
    colors: ["green", "fuchsia"],
    size_low: 1,
    size_high: 6,
    age_low: 8,
    age_high: 12,
    max_distance: 40
  };
