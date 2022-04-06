import AssetsCard from "components/atoms/Cards/assetsCard";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {ethers} from "ethers";
import { CircularProgress, containerClasses } from "@mui/material";
import { CallGetOrganizationAssets } from "components/wallet/contractCall";



declare var window: Window & {ethereum: any};

type Asset = {
  name: string,
  assetType: string,
  creationDate: number,
  adquireDate: number
}


const GetAssets = () => {
  console.log("hola")
  const idOrg = 2;
  /* const {isLoading, data: assets} = useQuery("assets", () =>
      CallGetOrganizationAssets(idOrg).then((response) => response.data as any)
     ); */

    const assets: any = CallGetOrganizationAssets(idOrg).then((response) => {
      console.log(response);
      const cont = response[0].length;
      let container: Asset[];
      //let object = new container;
      for(var i = 0; i < cont; i++){
        console.log(response[0][i]);
        //dale = dale.push(response[0][i]);
      }
    });
    //TODO GET AS ID
    /* assets?.map((asset:any) => (
      assets)) */
    console.log(assets);
            
            
}

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
            //navigate("/login");
        } else {
            //RETRIEVE ALL ASSETS FROM A ORGANIZATION
            // hacer request a contrato
            GetAssets();
            setIsLoading(false);
            
            
        }
    }).catch(() =>
    {
        //navigate("/login");
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
