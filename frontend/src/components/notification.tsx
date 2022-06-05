import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Notify } from "types";

const Notification = (props: Notify) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Alert severity={props.type as AlertColor}>{props.message}</Alert>
    </Snackbar>
  );
};

export default Notification;
