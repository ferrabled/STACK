import { Card, Typography } from "@mui/material";
import React from "react";

const OrganizationCard = (props: any) => {
    const org = props.data;
    

    return (
        <Card id="Organization" className="mb-5">
                    <div className="flex flex-col m-5">
                        <Typography variant="h6">Datos de la Organización</Typography>
                            <div className="flex flex-row justify-between content-evenly"> 
                                <Typography variant="h6">Nombre</Typography>
                                <div>{org.name}</div>
                            </div> 
                            <div className="flex flex-row justify-between content-evenly"> 
                                <Typography variant="h6">Dirección</Typography>
                                <div>{org.address}</div>
                            </div>
                            <div className="flex flex-row justify-between content-evenly"> 
                                <Typography variant="h6">Teléfono</Typography>
                                <div>{org.telephone}</div>
                            </div>
                        </div>                
                </Card> 
    )
}

export default OrganizationCard; 

