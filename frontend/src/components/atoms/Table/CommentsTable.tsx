import { Comment, CommentInTable } from "types";
import { Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams, GridSelectionModel } from "@mui/x-data-grid"
import { CallInsertUsersToAsset } from "components/wallet/userCall";
import { useEffect, useState } from "react";
import { Department } from "types"
import VisibilityIcon from '@mui/icons-material/Visibility';
import BasicModal from "../Modals/assetsFromUser";
import { Navigate, useNavigate } from "react-router-dom";

const CommentsTable = (comments: CommentInTable[]) => {

    const navigate = useNavigate();
    const [rows, setRows] = useState<any>([]); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const departmentList:any[] = [];
        const cont = Object.keys(comments).length;
        console.log("Número de comentarios total: "+cont)
        for (let i = 0; i < cont; i++) {
            comments[i].id = (i+1);
            departmentList.push(comments[i]);
        }
        setRows(departmentList);
        setIsLoading(false);
      }, [comments])
    
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "description", headerName: "Descripción", width: 150 },
        { field: "date", headerName: "Fecha", width: 180,
        renderCell: (params) => {
            const date = new Date(params.row.date);
            const dateString = (date).toLocaleString();
            return <>{dateString}</>
          }, },
        
        { field: "fullName", headerName: "Usuario", width: 130 },
        { field: "email", headerName: "Correo", width: 130 },
        { field: "telephone", headerName: "Correo", width: 130 },

      ];


    return(
        <>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            />
        </>
    )
} 

export default CommentsTable;