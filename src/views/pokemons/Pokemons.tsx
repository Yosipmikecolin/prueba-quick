import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapQuery } from "../../api/queries/querie-pokemon";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import classes from "./Pokemons.module.css";
import { Box } from "@mui/material";
import IconEye from "/images/icon-eye.png";
import IconLeft from "/images/icon-left.png";

const Pokemons: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [map, setMap] = useState<L.Map | null>(null);
  const { data: pokemons, refetch } = useMapQuery(currentPage);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "pokemonName",
      headerName: "Nombre",
      width: 150,
    },
    {
      field: "location",
      headerName: "Localización",
      width: 150,
    },
    {
      field: "see",
      headerName: "Ubicacíon",
      width: 150,
      renderCell: (params) => (
        <button
          className={classes["button-map"]}
          onClick={() => handleZoomToLocation(params.row.lat, params.row.lng)}
        >
          <img src={IconEye} width={20} height={20} />
        </button>
      ),
    },

    {
      field: "image",
      headerName: "Imagen",
      width: 150,
      renderCell: (params) => (
        <img src={params.row.image} width={50} height={50} />
      ),
    },
  ];

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
  }, [pokemons]);

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

  const handleZoomToLocation = (lat: number, lng: number) => {
    if (map) {
      map.setView([lat, lng], 5);
    }
  };

  return (
    <section className={classes["container-pokemons"]}>
      <div className={classes["card-map"]}>
        <div className={classes["card-pokemons"]}>
          <Box>
            <DataGrid
              rows={pokemons ?? []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              checkboxSelection
              disableRowSelectionOnClick
              hideFooterPagination
              hideFooter
            />
          </Box>

          <div className={classes["container-buttons-paginations"]}>
            <button
              className={classes["button-pagination"]}
              onClick={handlePrevPage}
            >
              <img src={IconLeft} width={30} />
            </button>
            <button
              className={classes["button-pagination"]}
              onClick={handleNextPage}
            >
              <img src={IconLeft} width={30} />
            </button>
          </div>
        </div>
        <div ref={mapRef} className={classes.map} />
      </div>
    </section>
  );
};

export default Pokemons;
