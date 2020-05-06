export interface Photos {
  full: string[];
  small: string[];
}

export interface BackendEntity {
  id: number;
  name: string;
  fallback: string;
}

export interface Pet {
  age: string;
  color: string;
  description: string;
  distance?: any;
  gender: string;
  id: number;
  name: string;
  photos: Photos;
  primary_breed: BackendEntity;
  secondary_breed: BackendEntity;
  shelter: BackendEntity;
  size: string;
  species: string;
  url: string;
}
