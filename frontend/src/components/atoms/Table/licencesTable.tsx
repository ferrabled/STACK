import { Licence, LicenceTypes } from "types";
import { DataGrid, GridColDef, GridRowParams, GridSelectionModel } from "@mui/x-data-grid"
import { useEffect, useState } from "react";


const LicencesTable = (licences: Licence[]) => {

    const [rows, setRows] = useState<any>([]); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const licencesList:any[] = [];
        const cont = Object.keys(licences).length;
        console.log("Número de licencias total: "+cont)
        for (var i = 0; i < cont; i++) {
            licences[i].id = (i+1);
            licencesList.push(licences[i]);
        }
        setRows(licencesList);
        setIsLoading(false);
      }, [licences])
    
    const columns: GridColDef[] = [
        { field: "name", headerName: "Nombre", width: 200 },
        { field: "key", headerName: "Clave", width: 220 },
        { field: "adquireDate", headerName: "Adquisición", width: 100,
        renderCell: (params) => {
            const date = new Date(params.row.adquireDate);
            const dateString = (date).toLocaleString();
            const split = dateString.split(',')
            return <>{split[0]}</>
          }, },
        { field: "expirationDate", headerName: "Expiración", width: 100,
        renderCell: (params) => {
            const date = new Date(params.row.expirationDate);
            const dateString = (date).toLocaleString();
            const split = dateString.split(',')
            return <>{split[0]}</>
        }, },
    
        { field: "licenseType", headerName: "Tipo", width: 80,
        renderCell: (params) => {
            return <>{LicenceTypes[Number(params.row.licenseType)]}</>
        },  },
      ];


return(
        <>
        {!isLoading && <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            />}
        </>
    )
} 

export default LicencesTable;