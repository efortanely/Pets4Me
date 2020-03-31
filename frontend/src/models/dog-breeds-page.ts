import { DogBreed } from './dog-breed'

export interface DogBreedsPage{
  num_results: number
  objects: DogBreed[]
  page: number
  total_pages: number
}