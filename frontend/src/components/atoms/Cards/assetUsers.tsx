import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, Button, CircularProgress, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';


const AssetUsersTable = (assetId: number) => {

    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState('');

  //CALL TO CONTRACT IN ORDER TO GET USERS BY ID OF ASSET


    useEffect(() => {
      /* const userList:any[] = [];
      console.log("objects");
      console.log(users)
      const cont = Object.keys(users).length;
      console.log("len "+cont);
      for (var i = 0; i < cont; i++) {
          console.log(users[i]);
          users[i].id = (i+1);
          //console.log("AAA")
          userList.push(users[i]);
      }
      console.log(Object.keys(users).length);
      setRows(userList);
      setIsLoading(false); */
    }, [])


    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Nombre", width: 130 },
      { field: "surname", headerName: "Apellido", width: 130 },
      { field: "email", headerName: "Correo", width: 130 },
      { field: "telephone", headerName: "Teléfono", width: 130 },
      {
        field: "action",
        headerName: "Activos",
        sortable: false,
        width: 80,
        renderCell: (params) => {
          const onClickDetails = (e:any) => {
            e.stopPropagation(); // don't select this row after clicking
            console.log("HOLA")
            console.log(params.row.index);
  
            const userId = params.row.index;
            setUserId(userId);
            //setShowModal(true);
          };
  
          return <>
          <div className="w-1/3">
            <IconButton color="primary" onClick={onClickDetails}>
              <VisibilityIcon/>
            </IconButton></div>
          </>;
        },
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