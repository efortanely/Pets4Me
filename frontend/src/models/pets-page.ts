export interface PetsPage {
  num_results: number
  num_pages: number
  page: number
  // TODO change to Pet[] when Pet interface is created
  data: any[]
}