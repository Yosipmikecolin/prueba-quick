import { useEffect, useRef } from "react";
import { LocationData } from "../../../../interfaces";
import L from "leaflet";
import { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./MapPokemons.module.css";

interface Props {
  pokemons?: LocationData[];
  currentPage: number;
  setMap: React.Dispatch<React.SetStateAction<Map | null>>;
}

const MapPokemons = ({ pokemons, currentPage, setMap }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current && pokemons) {
      const map = L.map(mapRef.current, { scrollWheelZoom: false }).setView(
        [0, 0],
        2
      );

      const southWest = L.latLng(-90, -180);
      const northEast = L.latLng(90, 180);
      const bounds = L.latLngBounds(southWest, northEast);
      map.setMaxBounds(bounds);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      pokemons.forEach((pokemon) => {
        L.marker([pokemon.lat, pokemon.lng])
          .addTo(map)
          .bindPopup(pokemon.pokemonName);
      });

      setMap(map);
      return () => {
        map.remove();
      };
    }
  }, [pokemons, mapRef, currentPage]);

  return <div ref={mapRef} className={classes.map} />;
};

export default MapPokemons;
