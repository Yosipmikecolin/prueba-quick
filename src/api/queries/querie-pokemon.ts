import { LocationData } from "../../interfaces";
import { useQuery } from "react-query";
import { fetchPokemonEncounter } from "../axios/get-pokemons";

export const useMapQuery = (page: number) => {
  return useQuery<LocationData[], Error>({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemonEncounter(page),
  });
};
