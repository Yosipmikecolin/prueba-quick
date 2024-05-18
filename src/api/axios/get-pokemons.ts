import axios from "axios";
import {
  LocationData,
  Pokemon,
  SecondResult,
  ThirdResult,
} from "../../interfaces";
import { getRandomCoordinates } from "../../utils";

export const fetchPokemonEncounter = async (page: number) => {
  let limit = 10,
    offset;

  if (page === 1) {
    offset = 0;
  } else {
    offset = page * 10 - 10;
  }

  try {
    const { data } = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    const encounters: LocationData[] = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonId =
          pokemon.url !== null ? pokemon.url.match(/\d+(?=\/$)/)?.[0] : 0;
        const coordinates = getRandomCoordinates();
        const { data: secondResult } = await axios.get<SecondResult>(
          pokemon.url
        );
        const { data: thirdResult } = await axios.get<ThirdResult[] | []>(
          secondResult.location_area_encounters
        );
        return {
          id: Number(pokemonId),
          lat: coordinates.lat,
          lng: coordinates.lng,
          pokemonName: pokemon.name,
          image: secondResult.sprites.front_default,
          location: thirdResult.length
            ? thirdResult[0].location_area.name
            : "Sin ubicación",
          powers: secondResult.moves.length
            ? secondResult.moves.slice(0, 10).map((i) => i.move.name)
            : [],
        };
      })
    );
    return encounters;
  } catch (error) {
    throw error;
  }
};
