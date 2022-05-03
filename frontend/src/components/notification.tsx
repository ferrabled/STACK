import { Alert, Snackbar } from "@mui/material";
import React from "react";

const Notification = (props: any) => {

    return (
        <Snackbar 
            open={props.isOpen}
            autoHideDuration={1000}
            anchorOrigin={{vertical:'top', horizontal:'right'}}
            >

            
                <Alert severity={props.type}>
                    {props.message}
                </Alert>
        </Snackbar>
    );
} 


export default Notification;