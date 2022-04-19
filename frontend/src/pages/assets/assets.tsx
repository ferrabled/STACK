import AssetsCard from "components/atoms/Cards/assetsCard";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import { CircularProgress, containerClasses } from "@mui/material";
import { CallGetOrganizationAssets } from "components/wallet/contractCall";

declare var window: Window & { ethereum: any };

type Asset = {
  name: string;
  assetType: string;
  creationDate: number;
  adquireDate: number;
  originalId: number;
};

const AssetsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState({});
  const navigate = useNavigate();

  

  useEffect(() => {
    const GetAssets = () => {
      //const idOrg = Number(localStorage.getItem('idOrg'));
      const idOrg = 2;
  
      CallGetOrganizationAssets(idOrg).then((response) => {
        console.log(response);
        const cont = response[0].length;

        let container: Asset[] = [];
        //let object = new container;
        for (var i = 0; i < cont; i++) {
          const asset: Asset = {
            name: response[0][i].name,
            assetType: response[0][i].assetType,
            creationDate: Number(response[0][i].creationDate),
            adquireDate: Number(response[0][i].adquireDate),
            originalId: Number(response[0][i].index)
          }
          console.log("Añadido")
          console.log(asset);
          container.push(asset);
        }
        console.log("CONTAINER "+ container)
        console.log(container);
        setAssets(container);
        console.log("Enviamos")
        console.log(assets);
        setIsLoading(false);
      });
      
      
      
    };



    // Ethers login
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    signer
      .getAddress()
      .then((addr) => {
        console.log(addr);
        if (!addr) {
          //navigate("/login");
        } else {
          //RETRIEVE ALL ASSETS FROM A ORGANIZATION
          // hacer request a contrato
          GetAssets();
          
        }
      })
      .catch(() => {
        //navigate("/login");
      });
  },[]);

  if (isLoading === true) return <CircularProgress />
  else return (
    <div className="min-h-full h-full">
      <AssetsCard props={assets} />
    </div>
  );

  // if (!isCorrectLogin) {
  //     return <p>EROROIRORORORORORORORRRRR NO TIENES ACCESO!!!!!</p>
  // }

  
};

export default AssetsPage;
