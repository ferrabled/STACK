import { Card, Typography } from "@mui/material";
import React from "react";


const AdministratorCard = (props: any) => {
    const admin = props;

    return (
        <Card id="Administrator" className="">
                <div className="flex flex-col m-5">
                    <Typography variant="h6">Datos del Administrador</Typography>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Nombre</Typography>
                            <div>{}</div>
                        </div> 
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Apellido</Typography>
                            <div>{}</div>
                        </div>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Correo electrónico</Typography>
                            <div>{}</div>
                        </div>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Teléfono   </Typography>
                            <div>{}</div>
                        </div>
                    </div>                
            </Card>
    )
}

export default AdministratorCard; 
