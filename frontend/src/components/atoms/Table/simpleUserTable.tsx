import { Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams, GridSelectionModel } from "@mui/x-data-grid"
import { CallInsertUsersToAsset, CallInsertUserToDepartment } from "components/wallet/userCall";
import { useEffect, useState } from "react";
import { Users } from "types"
import VisibilityIcon from '@mui/icons-material/Visibility';
import BasicModal from "../Modals/assetsFromUser";


const SimpleUserTable = ({users, depart, idList}:{users: Users[], depart:boolean, idList:number[]}) => {

    const [rows, setRows] = useState<any>([]);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [userId, setUserId] = useState("");
 
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [assetId, setAssetId] = useState("");


    useEffect(() => {
        const assetId = window.sessionStorage.getItem("detailId")!;
        setAssetId(assetId);
        const userList:any[] = [];
        const cont = Object.keys(users).length;
    
        for (var i = 0; i < cont; i++) {
            console.log(users[i]);
            users[i].id = (i+1);
            //console.log("AAA")
            userList.push(users[i]);
        }
        console.log(Object.keys(users).length);
        setRows(userList);
        setIsLoading(false);
      }, [])

    const handleSubmit = () => {
        console.log(selectionModel)
        const cont = Object.keys(selectionModel).length;
        const ids:number[] = [];
        for (var i = 0; i < cont; i++) {
            const item:any = selectionModel[i]; 
            ids.push(item.index);
        }
        if(depart === true) {
          console.log("add users to department");
          const departId = window.sessionStorage.getItem("departId");
          CallInsertUserToDepartment(Number(departId), ids);
        }
        else{
          console.log("add users to asset");
          CallInsertUsersToAsset(Number(assetId), ids);
        } 

    }
    
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


    return(
        <>
        <DataGrid
            rows={rows}
            columns={columns}
            isRowSelectable={(params: GridRowParams) => !idList.includes(params.row.index)}
            checkboxSelection
            onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectionModel = rows.filter((row:any) =>
                  selectedIDs.has(row.id),
                );
      
                setSelectionModel(selectionModel);
              }}
            //selectionModel={selectionModel}

            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            />
            <BasicModal show={showModal!} close={()=> setShowModal(false)} userId={userId}></BasicModal>
            <div className="flex flex-row items-center justify-center mt-6">
        <Button color="primary" variant="contained" onClick={()=> handleSubmit()}>Aceptar</Button></div></>
    )
} 

export default SimpleUserTable