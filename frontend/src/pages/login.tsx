import React, { useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import Page from "./page";
import { ConnectButton } from "components/atoms";
import { useNavigate } from "react-router-dom";
import Notification from "components/notification";

const LogInCard = () => {
  const navigate = useNavigate();
  const [notify, setNotify] = useState<any>({isOpen:false, message:'', type:'info'})


  const onCreateOrgClick = () => {
    navigate("/organization/new");
  };

  return (
    <Card className="m-5 flex animate-fade-in-top flex-col gap-5 p-10 justify-center items-center">
      <Notification {...notify}></Notification>

      <div className="h-44"></div>

      <Button
        className="w-80 h-24"
        variant="contained"
        color="primary"
        onClick={onCreateOrgClick}
      >
        <Typography variant="h6">Registrar una organización</Typography>
      </Button>
      <ConnectButton setNotifyParent={setNotify}></ConnectButton>
    </Card>
  );
};

const LogInPage = () => {
 
  return (
    <Page title="">
      <div className="overflow-hidden">
        <LogInCard />
      </div>
    </Page>
  );
};

export default LogInPage;
