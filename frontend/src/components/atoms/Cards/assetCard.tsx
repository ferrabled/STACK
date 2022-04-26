import { Button, Card, Skeleton, Table, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import AssetUsersTable from "./assetUsers";
import { CallDeleteAsset, CallInsertEditedAsset } from "components/wallet/contractCall";
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils";

const AssetCard = (props: any) => {
    const navigate = useNavigate();
    const asset = props.props
    
    const deleteAsset = () => {
        console.log("Eliminando asset");
        CallDeleteAsset(Number(window.sessionStorage.getItem('detailId'))).then((response) => {
            //TODO AWAIT FOR THE CONTRACT TO BE SIGNED IN ORDER TO NAVIGATE TO ASSETS
        });
        navigate("/assets");
    } 

    const onClickEdit = () => {
        window.sessionStorage.setItem('editId', window.sessionStorage.getItem('detailId')!)
        navigate("edit");
    }

    const onClickRecord = () => {
        navigate("record");
    }
    

    const adquireDate = new Date(asset.adquireDate);
    const formattedADate = formatDate(adquireDate);
    const creationDate = new Date(asset.creationDate);
    const formattedCDate = formatDate(creationDate);


    return(

        <div>
            <section className="flex flex-row gap-4 justify-center">
                <Card className="p-5 m-5 w-1/2">
                    <div className="flex flex-col mb-5">
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Nombre</Typography>
                            {asset.name && <div>{asset.name}</div> ||
                            <Skeleton variant="text" width={85} height={32}/>}
                        </div> 
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Fecha de Creación</Typography>
                            {asset.name && <div>{formattedCDate}</div> ||
                            <Skeleton variant="text" width={85} height={32}/>}
                        </div>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Fecha de Adquisición</Typography>
                            {asset.name && <div>{formattedADate}</div> ||
                            <Skeleton variant="text" width={85} height={32}/>}
                            
                        </div>
                    </div>
                    <div className="flex flex-row justify-between content-evenly"> 
                        <div className="gap-5">
                            <Button variant="contained" color="primary" onClick={onClickEdit}> Editar </Button>
                            <Button variant="contained" color="primary" onClick={deleteAsset}> Eliminar </Button>
                        </div>
                        <Button variant="contained" color="primary" onClick={onClickRecord}> Historial de Cambios </Button>
                    </div>
                </Card>
                <Card className="p-5 m-5 w-1/2">
                    <div className="flex flex-col mb-5">
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Nombre</Typography>
                            <Skeleton variant="text" width={85} height={32}/>
                        </div> 
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Apellidos</Typography>
                            <Skeleton variant="text" width={85} height={32}/>
                        </div>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Email</Typography>
                            <Skeleton variant="text" width={85} height={32}/>
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
                    <Skeleton variant="rectangular"/>
                    {/* <AssetUsersTable/> */}
                </Card>
            </section>
            
        </div>
    )
}


export default AssetCard;