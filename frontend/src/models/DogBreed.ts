export interface DogBreed {
  id: number
  name: string
  temperament: string
  life_span: Span
  height_imperial: Span
  weight_imperial : Span
  bred_for : string
  breed_group : string
  dog_ids: number[]
  shelters_with_breed: number[],
  photo: string
  video_url: string
}

interface Span {
  low: number
  high: number
}