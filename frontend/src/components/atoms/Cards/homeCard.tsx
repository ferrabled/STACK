import { Button, Card } from "@mui/material";
import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";



const HomeCard = () => {

    const navigate = useNavigate();

    const redirectAssets = () => {
        navigate("/assets");
    }

    const redirectDepartments = () => {
        navigate("/departments");
        
    }

    const redirectMyOrganization = () => {
        navigate("/organization");
        
    }

    return (
        <>
        <Card className="gap-7 p-10 flex flex-col items-center">
            <div className="h-56 items-center ">
                <Typography className="p-8" variant="h4" >Bienvenido </Typography>
                <Typography variant="h4" >Usuario </Typography>
            </div>
            <Button className='w-64 h-24' variant="contained" color="primary" onClick={redirectAssets}>
                <Typography> Mis Activos </Typography>
            </Button>

            <Button className='w-64 h-24' variant="contained" color="primary" onClick={redirectDepartments}>
                <Typography> Departamentos </Typography>
            </Button>

            <Button className='w-64 h-24' variant="contained" color="primary" onClick={redirectMyOrganization}> 
                <Typography> Mi organización </Typography>
            </Button>
            
        </Card>
        </>
    )
};


export default HomeCard;