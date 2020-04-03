export interface Shelter {
  id: number;
  name: string;
  address: Address
  contact: Contact
  photos: Photos
  all_pets: AllPetsDictionary
  distance?: any
  adoption_policy?: string
  mission?: string
  top_cat_breed_id?: number
  top_dog_breed_id?: number
}

interface Address {
  country: string
  state: string
  postcode: number
  address1: string
  address2: string
  city: string
}

interface Contact {
  email: string
  phone_number: string
}

export interface Photos {
  full: string[]
  small: string[]
}

interface AllPetsDictionary {
  [index: string]: ShelterPet
}

interface ShelterPet {
  id: number
  species: string
}
