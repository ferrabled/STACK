import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



const PageLoged = (props: {
  //title?: string;
  children?: React.ReactNode;
  //actions?: React.ReactNode;
}) => {
    const navigate = useNavigate();


    

    

    useEffect(() => {

        const CheckConnection = ()  => {
            
            const address = localStorage.getItem('userAddress');
            
            if(address === null){
                console.log("No account");
                navigate("/login");
            } else {
                console.log("Logged in");
            }
        }


        CheckConnection();
    })
    

  return (
    <section className="block w-full py-5 px-4 md:px-8 lg:px-24 xl:px-48">
      {/* <Box className="flex items-center justify-between md:flex-row">
        {props.title && <Typography variant="h1">{props.title}</Typography>}
        {props.actions && (
          <div className="flex flex-col gap-2 md:flex-row md:justify-end">
            {props.actions}
          </div>
        )}
      </Box> */}
      <Box>{props.children}</Box>
    </section>
  );
};

export default PageLoged;