import axios from "axios";
import { LocationData, Pokemon } from "../../interfaces";
import { getRandomCoordinates } from "../../utils";

export const fetchPokemonEncounter = async (page: number) => {
  let limit, offset;

  if (page === 1) {
    limit = 10;
    offset = 0;
  } else {
    limit = page * 10;
    offset = page * 10 - 10;
  }

  try {
    const { data } = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    const encounters: LocationData[] = data.results.map((pokemon) => {
      const coordinates = getRandomCoordinates();
      return {
        lat: coordinates.lat,
        lng: coordinates.lng,
        pokemonName: pokemon.name,
      };
    });
    return encounters;
  } catch (error) {
    throw error;
  }
};
