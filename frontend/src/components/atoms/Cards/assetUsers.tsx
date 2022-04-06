import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";

const AssetUsersTable = () => {
    //CALL TO CONTRACT IN ORDER TO GET USERS BY ID OF ASSET



    const columns: GridColDef[] = [
        { field: "firstName", headerName: "Nombre completo", width: 130 },
        { field: "lastName", headerName: "Correo", width: 130 },
        { field: "", headerName: "Teléfono", width: 130, sortable: false},
        { field: "address", headerName: "Billetera", sortable: false, width: 160,
          valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ""} ${params.row.lastName || ""}`,
        },
      ];

      const rows = [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
        { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
        { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
      ];

  return (
    <DataGrid
      className="w-full h-full"
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      autoHeight
    />
  );
};

export default AssetUsersTable;