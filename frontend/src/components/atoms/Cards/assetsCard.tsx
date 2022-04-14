import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Table, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AssetsList } from "types";
import { useNavigate } from "react-router-dom";

const AssetsCard = (props:any) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    const FormatData = () => {
      const listAssets = props.props;
      console.log("Recibimos los datos");
      console.log(listAssets);

      console.log(listAssets.length);
      const cont = listAssets.length;
      const tempRow: any[] = []; 
      for (var i = 0; i < cont; i++) {
        console.log(listAssets[i]);
        listAssets[i].id = i;
        //console.log("AAA")
        tempRow.push(listAssets[i]);
      }
      console.log("ROWWWWWWWWW");
      console.log(rows);
      setRows(tempRow);
    }
    FormatData();
    setIsLoading(false)
  }, [])

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  /* const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ]; */

    console.log(rows);
  /* const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Frank",
      lastName: "Murphy",
      email: "frank.murphy@test.com",
      role: "User",
    },
    {
      id: 2,
      firstName: "Vic",
      lastName: "Reynolds",
      email: "vic.reynolds@test.com",
      role: "Admin",
    },
    {
      id: 3,
      firstName: "Gina",
      lastName: "Jabowski",
      email: "gina.jabowski@test.com",
      role: "Admin",
    },
    {
      id: 4,
      firstName: "Jessi",
      lastName: "Glaser",
      email: "jessi.glaser@test.com",
      role: "User",
    },
    {
      id: 5,
      firstName: "Jay",
      lastName: "Bilzerian",
      email: "jay.bilzerian@test.com",
      role: "User",
    },
  ]); */
  if (isLoading) return <CircularProgress />
  else return (
    <Card className="gap-7 p-10 flex flex-col items-center h-full">
      <DataGrid
        className="w-full h-full"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
      ></DataGrid>
      <div className="w-full flex flex-row justify-evenly">
        <Button color="primary" variant="contained" onClick={() => window.history.back()}> Atrás </Button>
        <Button color="primary" variant="contained" onClick={() => navigate("/assets/new")}> Nuevo Activo </Button>
      </div>
      
    </Card>
  );
};

export default AssetsCard;
