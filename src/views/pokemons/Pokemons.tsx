import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapQuery } from "../../api/queries/querie-pokemon";

const PokemonMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch } = useMapQuery(currentPage);

  useEffect(() => {
    if (mapRef.current && data) {
      const map = L.map(mapRef.current, {
        scrollWheelZoom: false,
      }).setView([0, 0], 2);

      const southWest = L.latLng(-90, -180);
      const northEast = L.latLng(90, 180);
      const bounds = L.latLngBounds(southWest, northEast);

      map.setMaxBounds(bounds);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      data.forEach((pokemon) => {
        L.marker([pokemon.lat, pokemon.lng])
          .addTo(map)
          .bindPopup(pokemon.pokemonName);
      });

      return () => {
        map.remove();
      };
    }
  }, [data]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    refetch();
  };

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
      refetch();
    }
  };

  return (
    <div>
      <div ref={mapRef} style={{ height: 800, width: 1200 }} />
      <button onClick={handlePrevPage}>Anterior página</button>
      <button onClick={handleNextPage}>Siguiente página</button>
    </div>
  );
};

export default PokemonMap;
