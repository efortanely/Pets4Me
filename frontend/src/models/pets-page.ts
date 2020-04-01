import { Pet } from "./pet";

export interface PetsPage<T>{
  num_results: number
  total_pages: number
  page: number
  objects: T[]
}