import React, {useState} from "react";
import { TextField, Button, Typography } from '@mui/material';
import { OrganizationFormValues } from "types";
import { Navigate } from "react-router-dom";


const OrganizationForm3 = () => {
  
  
  return (
    <div className="flex flex-col m-12 items-center">
      <Typography>Para finalizar debes conectar tu cartera Metamask, de esta manera asociamos los datos de tu organización a tu billetera y guardamos la información de una manera segura en la Blockchain.</Typography>
      <img className="h-44 w-44 my-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"/>
      <Button className="mt-5" type="submit" variant="contained" color="primary">
            Conectar
      </Button>
      <a className="mt-5" href="https://metamask.io/" target="_blank"><Typography sx={{textDecoration: 'underline'}} variant="body2">No sé como conectar Metamask</Typography></a>
    </div>
  );
};

export default OrganizationForm3;