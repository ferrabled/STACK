import { Button, Card, Table, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import AssetUsersTable from "./assetUsers";
import { CallInsertEditedAsset } from "components/wallet/contractCall";
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils";

const AssetCard = (props: any) => {

    const navigate = useNavigate();

    const asset = props.props

    const deleteAsset = () => {
        console.log("Eliminando asset");

        try {
            asset.deleted = true;
            console.log(asset.adquireDate.getTime());
            console.log(asset.creationDate.getTime());
            let mem = asset.adquireDate.getTime();
            asset.adquireDate = mem;
            mem = asset.creationDate.getTime();
            asset.creationDate = mem;
        }
        catch {
            console.log("No need to format data");
        }
        
        CallInsertEditedAsset(asset);
        navigate("/assets");

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
                        <div className="gap-5">
                            <Button className="" variant="contained" color="primary"> Editar </Button>
                            <Button variant="contained" color="primary" onClick={deleteAsset}> Eliminar </Button>
                        </div>
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