import { Card, Typography } from "@mui/material";
import Page from "pages/page";
import React from "react";

const MyOrganizationPage = () => {
    type Organization = {
        name: string,
        address: string,
        telephone: Number
    }

    type Admin = {
        name: string,
        address: string,
        email: string,
        telephone: Number
    }

    const GetOrgAndAdminData = () => {
        //TODO CONNECT WITH BLOCKCHAIN



    }

    
    return (
        
        <Page>
            <Card id="Organization" className="mb-5">
                <div className="flex flex-col m-5">
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Nombre</Typography>
                            <div>{}</div>
                        </div> 
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Dirección</Typography>
                            <div>{}</div>
                        </div>
                        <div className="flex flex-row justify-between content-evenly"> 
                            <Typography variant="h6">Teléfono</Typography>
                            <div>{}</div>
                        </div>
                    </div>                
            </Card> 
            <Card id="Administrator" className="">
                <div className="flex flex-col m-5">
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
        </Page>     
        
    )

};



export default MyOrganizationPage;


