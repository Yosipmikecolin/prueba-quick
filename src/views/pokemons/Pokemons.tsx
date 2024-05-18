import React, { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapQuery } from "../../api/queries/querie-pokemon";
import classes from "./Pokemons.module.css";
import { MapPokemons, TablePokemon } from "./components";

const Pokemons: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [map, setMap] = useState<L.Map | null>(null);
  const { data: pokemons, refetch, isLoading } = useMapQuery(currentPage);

  return (
    <section className={classes["container-pokemons"]}>
      <>
        <div className={classes["card-map"]}>
          {isLoading ? (
            <div className={classes.loader} />
          ) : (
            <>
              <TablePokemon
                pokemons={pokemons}
                map={map}
                refetch={refetch}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              <MapPokemons
                currentPage={currentPage}
                setMap={setMap}
                pokemons={pokemons}
              />
            </>
          )}
        </div>
      </>
    </section>
  );
};

export default Pokemons;
