import AssetsCard from "components/atoms/Cards/assetsCard";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import { CircularProgress, containerClasses, Typography } from "@mui/material";
import { CallGetOrganizationAssets } from "components/wallet/contractCall";
import { AssetsInList, AssetTypes } from "types"
import PageLoged from "pages/pageCheckLogin";

declare var window: Window & { ethereum: any };

const AssetsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const GetAssets = () => {
      const idOrg = Number(localStorage.getItem('idOrg'));
      console.log("obteniendo assets")
      CallGetOrganizationAssets(idOrg).then((response) => {
        console.log(response);
        const cont = response[0].length;
        const contEdit = response[1].length;

        let container: AssetsInList[] = [];
        //let object = new container;
        for (var i = 0; i < cont; i++) {
          console.log(response[0][i]);
          console.log(i);
          const asset: AssetsInList = {
            name: response[0][i].name,
            assetType: response[0][i].assetType,
            assetDepart: response[0][i].assetDepart,
            assetTS: AssetTypes[response[0][i].assetType],
            creationDate: Number(response[0][i].creationDate),
            adquireDate: Number(response[0][i].adquireDate),
            originalId: Number(response[0][i].index),
            index: Number(response[0][i].index)
          }
          console.log("original")
          console.log(asset);
          //TODO CHECK IF IT RETURNS ANY ASSET DELETED
          if(asset.creationDate === 0  && asset.adquireDate === 0) continue;
          else {
            container.push(asset);
          }
          
        }

        for (var o = 0; o < contEdit; o++) {
          console.log(response[1][o]);
          const asset: AssetsInList = {
            name: response[1][o].name,
            assetType: response[1][o].assetType,
            assetTS: AssetTypes[response[1][o].assetType],
            assetDepart: response[1][o].assetDepart,
            creationDate: Number(response[1][o].creationDate),
            adquireDate: Number(response[1][o].adquireDate),
            originalId: Number(response[1][o].originalAssetId),
            index: Number(response[1][o].index),
          }
          if(asset.creationDate === 0  && asset.adquireDate === 0) continue;
          else {
            console.log("Añadido")
            console.log(asset);
            container.push(asset);
          }
          
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
    <PageLoged>
    <Typography variant="h5">Todos los activos</Typography>
    <div className="min-h-full h-full">
      <AssetsCard props={assets} />
    </div>
    </PageLoged>
  );

  // if (!isCorrectLogin) {
  //     return <p>EROROIRORORORORORORORRRRR NO TIENES ACCESO!!!!!</p>
  // }

  
};

export default AssetsPage;
