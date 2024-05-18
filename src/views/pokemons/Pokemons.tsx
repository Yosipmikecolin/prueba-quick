import React, { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapQuery } from "../../api/queries/querie-pokemon";
import classes from "./Pokemons.module.css";

import TablePokemon from "./components/table-pokemons/TablePokemons";
import MapPokemons from "./components/map-pokemons/MapPokemons";

const Pokemons: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [map, setMap] = useState<L.Map | null>(null);
  const { data: pokemons, refetch } = useMapQuery(currentPage);

  return (
    <section className={classes["container-pokemons"]}>
      <div className={classes["card-map"]}>
        <div className={classes["card-pokemons"]}>
          <TablePokemon
            pokemons={pokemons}
            map={map}
            refetch={refetch}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <MapPokemons
          currentPage={currentPage}
          setMap={setMap}
          pokemons={pokemons}
        />
      </div>
    </section>
  );
};

export default Pokemons;
