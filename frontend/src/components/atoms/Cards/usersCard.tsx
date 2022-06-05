import { useEffect, useState } from "react";
import { Card, Button, CircularProgress, IconButton } from "@mui/material";
import { DataGrid,  GridColDef } from "@mui/x-data-grid";
import { TableUser } from "types";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BasicModal from "../Modals/assetsFromUser";



const UsersCard = (users:TableUser[]) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState('');



  useEffect(() => {
    const userList:any[] = [];
    const cont = Object.keys(users).length;
    for (let i = 0; i < cont; i++) {
        console.log(users[i]);
        users[i].id = (i+1);
        userList.push(users[i]);
    }
    setRows(userList);
    setIsLoading(false);
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
          setShowModal(true);
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


    console.log(rows);

  if (isLoading) return <CircularProgress />
  else return (
      <>
    
      <DataGrid
        className="w-full h-full"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
      ></DataGrid>
    <BasicModal show={showModal!} close={()=> setShowModal(false)} userId={userId}></BasicModal></>
  );
};

export default UsersCard;
