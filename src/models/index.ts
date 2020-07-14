export interface Place {
  id: number;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Coords {
  lat: number;
  lng: number;
}
