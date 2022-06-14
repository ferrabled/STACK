import { Button, Card, Typography } from "@mui/material";
import { ConnectButton } from "components/atoms";
import useToast from "hooks/useNotify";
import React from "react";
import { useNavigate } from "react-router-dom";
import Page from "./page";

const LogInCard = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useToast();

  const onCreateOrgClick = () => {
    navigate("/organization/new");
  };

  return (
    <Card className="m-5 flex animate-fade-in-top flex-col gap-5 p-10 pt-20 pb-20 justify-center items-center">
      {toast}

      <h1 className="font-bold mb-10 text-3xl">Gestor Blockchain</h1>
      <Button
        className="w-80 h-24"
        variant="contained"
        color="primary"
        onClick={onCreateOrgClick}
      >
        <Typography variant="h6">Registrar una organización</Typography>
      </Button>
      <ConnectButton setNotifyParent={setToast}></ConnectButton>
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
