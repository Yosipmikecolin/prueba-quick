import React, { useCallback, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router";

import { useMapQuery } from "../../api/queries/querie-pokemon";
import { useAuth } from "../../hooks";

import { MapPokemons, TablePokemons } from "./components";
import IconClose from "/images/icon-close-sesion.png";
import classes from "./Pokemons.module.css";

const Pokemons: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setUser } = useAuth();
  const [map, setMap] = useState<L.Map | null>(null);
  const { data: pokemons, refetch, isLoading } = useMapQuery(currentPage);
  const navigate = useNavigate();

  const closeSesion = useCallback(() => {
    setUser(false);
    localStorage.removeItem("user");
    navigate("/");
  }, []);

  return (
    <section className={classes["container-pokemons"]}>
      <div className={classes["card-header-map"]}>
        <h2>POKEMONS</h2>
        <button
          className={classes["button-close-sesion"]}
          onClick={closeSesion}
        >
          <img src={IconClose} width={20} height={20} alt="icon-close" />
        </button>
      </div>
      <>
        <div className={classes["card-map"]}>
          {isLoading ? (
            <div className={classes.loader} />
          ) : (
            <>
              <TablePokemons
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

      <div className={classes["card-footer-map"]}>
        <span>© Quick 2024</span>
        <span>
          Desarrollado por:
          <strong>
            <a
              href="https://www.linkedin.com/in/yosip-mike-colin-parrado-6b22041bb/"
              target="_blank"
            >
              Yosip Mike Colin
            </a>
          </strong>
        </span>
      </div>
    </section>
  );
};

export default Pokemons;
