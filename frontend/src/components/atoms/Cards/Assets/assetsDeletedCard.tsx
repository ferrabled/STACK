import { Button, Card, CircularProgress, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils";
import { AssetsInList, AssetsList } from "types";
import { CallDeleteAsset, CallGetIsAssetEdited } from "components/wallet/contractCall";



const AssetsDeletedCard = (props:AssetsInList[]) => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const FormatData = () => {
        const listAssets = props;
        console.log("Recibimos los datos");
        console.log(listAssets);
        const cont = Object.entries(listAssets).length;

        const tempRow: any[] = []; 
        for (var i = 0; i < cont; i++) {
          listAssets[i].id = i;
          tempRow.push(listAssets[i]);
        }
        setRows(tempRow);
        setIsLoading(false)
      }
      FormatData();
    }, [])
  
    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "First name", width: 130 },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        width: 100,
        renderCell: (params) => {
          const onClickDetails = (e:any) => {
            e.stopPropagation(); // don't select this row after clicking
            console.log(params.row.originalId);
            const originalId = params.row.originalId;
            if(params.row.id == 0){
              window.sessionStorage.setItem('record', 'o');
              sessionStorage.setItem('detailId', String(originalId));   
            } else {
              console.log(params.row.index)
              window.sessionStorage.setItem('record', 'y' + String(params.row.index));
              //sessionStorage.setItem('detailId', String(params.row.index)); 
            }
            navigate("/asset/");
          };  
          
          return <>
          <div className="w-1/2">
            <IconButton color="primary" onClick={onClickDetails}>
              <VisibilityIcon/>
            </IconButton></div>
          </>;
        },
      },
      { 
        field: "adquireDate", 
        headerName: "Fecha", 
        width: 130, 
        renderCell: (params) => {
          const adquireDate = new Date(params.row.adquireDate);
          const adquireDateF = formatDate(adquireDate);
          return <>{adquireDateF}</>
        },
      },
      {
        field: "assetType",
        headerName: "Tipo",
        type: "string",
        width: 90,
      },
      {
        field: "assetDepart",
        headerName: "Departamento",
        type: "string",
        width: 90,
      },
    ];
  
  
      console.log(rows);
  
    if (isLoading) return <CircularProgress />
    else return (
      
      <Card className="gap-7 p-10 flex flex-col items-center h-full">
        
        { rows.length !==0 && (<DataGrid
          className="w-full h-full"
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
        ></DataGrid>
        )}
        <Typography>Aún no hay activos eliminados</Typography>
        <div className="w-full flex flex-row justify-evenly">
          <Button color="primary" variant="contained" onClick={() => window.history.back()}> Atrás </Button>
        </div>
        
      </Card>
    );
  };
  
export default AssetsDeletedCard;