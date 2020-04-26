import { Pet } from "./Pet";

export interface PetsPage<T> {
  num_results: number;
  total_pages: number;
  page: number;
  objects: T[];
}
