import { Button, Card, Table, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import AssetUsersTable from "./assetUsers";

const AssetCard = (props: any) => {

    const asset = props.props

    var formatDate = function formatDate(date: Date) {            // function for reusability
        var d = date.getUTCDate().toString(),           // getUTCDate() returns 1 - 31
            m = (date.getUTCMonth() + 1).toString(),    // getUTCMonth() returns 0 - 11
            y = date.getUTCFullYear().toString(),       // getUTCFullYear() returns a 4-digit year
            formatted = '';
        if (d.length === 1) {                           // pad to two digits if needed
            d = '0' + d;
        }
        if (m.length === 1) {                           // pad to two digits if needed
            m = '0' + m;
        }
        formatted = d + '/' + m + '/' + y;              // concatenate for output
        return formatted;
    }

    const adquireDate = new Date(asset.adquireDate);
    const formattedADate = formatDate(adquireDate);
    
    const creationDate = new Date(asset.creationDate);
    const formattedCDate = formatDate(creationDate);
    /* console.log(formattedADate);
    console.log(formattedCDate); */

    return(

        <div>
            <section className="flex flex-row gap-4 justify-center">
                <Card className="p-5 m-5 w-1/2">
                    <div className="flex flex-col mb-5">
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Nombre</Typography>
                            <div>{asset.name}</div>
                        </div> 
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Fecha de Creación</Typography>
                            <div>{formattedCDate}</div>
                        </div>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Fecha de Adquisición</Typography>
                            <div>{formattedADate}</div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between content-evenly"> 
                        <Button variant="contained" color="primary"> Editar </Button>
                        <Button variant="contained" color="primary"> Historial de Cambios </Button>
                    </div>
                </Card>
                <Card className="p-5 m-5 w-1/2">
                    <div className="flex flex-col mb-5">
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Nombre</Typography>
                            <div>Fernando</div>
                        </div> 
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Apellidos</Typography>
                            <div>Rabasco</div>
                        </div>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Email</Typography>
                            <div>frabascol@gmail.com</div>
                        </div>
                    </div>
                    <Button variant="contained" color="primary">Añadir Nuevo</Button>
                </Card>
            </section>
            <section>
                
                <Card className="p-5 m-5">
                <div className="flex flex-row justify-between content-evenly p-1 mb-3">
                    <Typography variant="h6">Usuarios del Activo</Typography>
                    <Button variant="contained" color="primary">Añadir Nuevo</Button>
                </div>
                    <AssetUsersTable/>
                </Card>
            </section>
            
        </div>
    )
}


export default AssetCard;