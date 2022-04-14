import { Button, CircularProgress, Typography } from "@mui/material";
import { HomeCard } from "components/atoms";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLoged from "./pageCheckLogin";

declare var window: any

const HomePage = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    // Ethers login
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    signer.getAddress().then(addr => {
      console.log(addr);
      if (!addr) {
          navigate("/login");
      } else {
          setIsLoading(false);
          // TODO ASK IF USER HAS ORG.
        }
      }).catch(() =>
      {
          navigate("/login");
      });

  

  if (isLoading) return <CircularProgress />


    /* async function handleConnectWallet() {
        const signer = provider.getSigner();
        await provider.send("eth_requestAccounts", []);
        console.log("Account:", signer.getAddress());
        if (signer){
            setCheckWallet(true);
        }   
    } */

  return signer ? (
    <div>
        <PageLoged>
        {/* <Typography>Conectado</Typography> */}
        <HomeCard></HomeCard>
        </PageLoged>
    </div> 
  ) : (
    <Button className='w-80 h-24' variant="contained" color="primary" /* onClick={handleConnectWallet} */><Typography variant="h6">Conectar Billetera</Typography></Button>
  );
}

export default HomePage;
