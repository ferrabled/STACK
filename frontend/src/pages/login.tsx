import React from 'react'
import { Button, Card, Typography } from "@mui/material";
import Page from "./page";
import { ConnectButton } from 'components/atoms';
import LImg from "assets/logo.svg";


const LogInCard = () => {
    const onContactClick = () => {
        window.scrollTo({
          behavior: "smooth",
          top: document.body.scrollHeight,
        });
    };

  return (
    <Card className="m-5 flex animate-fade-in-top flex-col gap-5 p-10 justify-center items-center">
        <div className='h-44'></div>
        
        <Button className='w-80 h-24' variant="contained" color="primary" onClick={onContactClick}>
            <Typography variant="h6">Registrar una organización</Typography>
        </Button>        
        <ConnectButton></ConnectButton>
    </Card>
  );
};

const LogInPage = () => {
  const [showCards, setShowCards] = React.useState(false);

  return (
    <Page title="">
      <div className="overflow-hidden">
            <LogInCard />
      </div>
    </Page>
  );
};

export default LogInPage;
