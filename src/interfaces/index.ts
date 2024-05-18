/* LOGIN */

export interface Inputs {
  username: string;
  password: string;
}

/* POKEMONS */
export interface LocationData {
  lat: number;
  lng: number;
  pokemonName: string;
  powers: string[];
}

export interface Pokemon {
  count: number;
  next: string;
  previous: string;
  results: Result1[];
}

export interface Result1 {
  name: string;
  url: string;
}

export interface SecondResult {
  moves: { move: Move }[];
  location_area_encounters: string;
}

export interface ThirdResult {
  location_area:   LocationArea;
}

export interface LocationArea {
  name: string;
  url:  string;
}

export interface Move {
  name: string;
  url: string;
}
