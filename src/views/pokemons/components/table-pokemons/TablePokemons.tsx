import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LocationData } from "../../../../interfaces";
import IconEye from "/images/icon-eye.png";
import IconLeft from "/images/icon-left.png";
import classes from "./TablePokemons.module.css";

interface Props {
  pokemons?: LocationData[];
  map: L.Map | null;
  refetch: () => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const TablePokemons = ({
  pokemons,
  map,
  refetch,
  currentPage,
  setCurrentPage,
}: Props) => {
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
      map.setView([lat, lng], 4);
    }
  };

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

  return (
    <div className={classes["card-pokemons"]}>
      <Box sx={{ width: "100%", height: "600px" }}>
        <DataGrid
          rows={pokemons ?? []}
          columns={columns}
          autoPageSize
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          hideFooterPagination
          hideFooter
        />
      </Box>

      <span>Página: {currentPage}</span>
      <div className={classes["container-buttons-paginations"]}>
        <button
          className={
            currentPage === 1
              ? classes["button-pagination-disabled"]
              : classes["button-pagination"]
          }
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
  );
};

export default TablePokemons;
