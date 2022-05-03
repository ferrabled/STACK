import { Card, Typography } from "@mui/material";
import React from "react";
import { Admin } from "types";

const AdministratorCard = (props: Admin) => {
    const admin = props;

    return (
        <Card id="Administrator" className="w-full">
                <div className="flex flex-col m-5">
                    <Typography variant="h6">Datos del Administrador</Typography>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Nombre</Typography>
                            <div>{admin.name}</div>
                        </div> 
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Apellido</Typography>
                            <div>{admin.lastName}</div>
                        </div>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Correo electrónico</Typography>
                            <div>{admin.email}</div>
                        </div>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Teléfono   </Typography>
                            <div>{admin.telephone}</div>
                        </div>
                    </div>                
            </Card>
    )
}

export default AdministratorCard; 
