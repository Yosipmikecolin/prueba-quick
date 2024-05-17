export interface Inputs {
  username: string;
  password: string;
}

export interface LocationData {
  lat: number;
  lng: number;
  pokemonName: string;
}

export interface Pokemon {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
