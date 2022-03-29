import AssetsCard from "components/atoms/Cards/assetsCard";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {ethers} from "ethers";
import { CircularProgress } from "@mui/material";

declare var window: Window & {ethereum: any};


const AssetsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [isCorrectLogin, setIsCorrectLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Ethers login
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    signer.getAddress().then(addr => {
        console.log(addr);
        if (!addr) {
            navigate("/login");
        } else {
            setIsLoading(false);
            // hacer request a contrato
            
        }
    }).catch(() =>
    {
        navigate("/login");
    });

  });


  if (isLoading) return <CircularProgress />

  // if (!isCorrectLogin) {
  //     return <p>EROROIRORORORORORORORRRRR NO TIENES ACCESO!!!!!</p>
  // }

  return (
    <div className="min-h-full h-full">
      <AssetsCard />
    </div>
  );
};

export default AssetsPage;
