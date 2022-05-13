import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const Notification = (props: any) => {
    const [open, setOpen] = useState(false);

    useEffect(()=> {
        setOpen(props.isOpen)
    }, [props])

    return (
        <Snackbar 
            open={open}
            autoHideDuration={5000}
            anchorOrigin={{vertical:'top', horizontal:'right'}}
            
            onClose={() => {setOpen(false)}}
            >
                <Alert severity={props.type}>
                    {props.message}
                </Alert>
        </Snackbar>
    );
} 


export default Notification;