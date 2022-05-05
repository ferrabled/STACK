import { CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CallDeleteAsset, CallGetIsAssetEdited } from "components/wallet/contractCall";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AssetsInList } from "types";

const SimpleAssetsTable = (props:AssetsInList[]) => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
  
  
    useEffect(() => {
  
      const FormatData = () => {
        const listAssets = props;
        // console.log("Recibimos los datos");
        // console.log(listAssets);
  
        // console.log(listAssets.length);
        const cont = Object.keys(listAssets).length;
        const tempRow: any[] = []; 
        for (var i = 0; i < cont; i++) {
          // console.log(listAssets[i]);
          listAssets[i].id = i;
          tempRow.push(listAssets[i]);
        }
        // console.log("ROWWWWWWWWW");
        // console.log(rows);
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
        width: 150,
        renderCell: (params) => {
          const onClickDetails = (e:any) => {
            e.stopPropagation(); // don't select this row after clicking
            console.log(params.row.originalId);
            const originalId = params.row.originalId;
            CallGetIsAssetEdited(originalId).then(
              (response) => {
                console.log("True or false");
                console.log(response);
                if(response) {
                  console.log("True");
                  sessionStorage.setItem('isEdited', String(true));
                } else {
                  console.log("false");
                  sessionStorage.setItem('isEdited', String(false));
                }
              sessionStorage.setItem('record','n');
              sessionStorage.setItem('detailId', String(originalId));    
              navigate("/asset/");
              }
            )
            //const api: GridApi = params.api;
            //sessionStorage.removeItem("editId");
            
           
  
          };
  
          const onClickEdit = (e:any) => {
            e.stopPropagation(); // don't select this row after clicking
            console.log("orignianl")
            console.log(params.row);
            const originalId = params.row.originalId;
            CallGetIsAssetEdited(originalId).then(
              (response) => {
                console.log("True or false");
                console.log(response);
                if(response) {
                  console.log("True");
                  sessionStorage.setItem('isEdited', String(true));
                  sessionStorage.setItem('editId', String(originalId));
                } else {
                  console.log("false");
                  sessionStorage.setItem('isEdited', String(false));
                  sessionStorage.setItem('editId', String(originalId));
                }   
              navigate("/asset/edit");
              }
            )
            
            //const api: GridApi = params.api;
            //sessionStorage.removeItem("editId");
  
            
  
          };
  
          const onClickDelete = (e:any) => {
            e.stopPropagation(); // don't select this row after clicking
            console.log("Eliminamos el activo: ");
            try {
              console.log("delete original asset:"+params.row.originalId);
              CallDeleteAsset(params.row.originalId);
              navigate("/assets");
            }
            catch {
                console.log("User reverted transaction");
            }
          };
          return <>
          <div className="w-1/3">
            <IconButton color="primary" onClick={onClickDetails}>
              <VisibilityIcon/>
            </IconButton></div>
          <div className="w-1/3 items-center">
          <IconButton color="primary" onClick={onClickEdit}>
            <EditIcon/>
          </IconButton></div>
          <div className="w-1/3">
          <IconButton color="primary" onClick={onClickDelete}>
            <DeleteForeverIcon/>
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
        field: "assetTS",
        headerName: "Tipo",
        type: "string",
        width: 90,
      },
      /* {
        field: "fullName",
        headerName: "Departamento",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      }, */
      
    ];
  
  
      console.log(rows);
  
    if (isLoading) return <CircularProgress />
    else return (
        <DataGrid
          className="w-full h-full"
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
        ></DataGrid>
    );
  };
  
  export default SimpleAssetsTable;
  