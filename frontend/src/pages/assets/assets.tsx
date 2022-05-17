import AssetsCard from "components/atoms/Cards/assetsCard";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import { Button, Card, CircularProgress, containerClasses, Typography } from "@mui/material";
import { CallGetAsset, CallGetOrganizationAssets } from "components/wallet/contractCall";
import { AssetsInList, AssetTypes } from "types"
import PageLoged from "pages/pageCheckLogin";
import { CallGetAllDepartmentsFromOrg, CallGetNumberOfCommentsByAsset } from "components/wallet/userCall";
import { convertToObject } from "typescript";

declare var window: Window & { ethereum: any };

const AssetsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<any>({});
  const navigate = useNavigate();
  const [departNames, setDepartNames] = useState<String[]>();
  const [numComments, setNumComments] = useState<Number[]>();

  useEffect(() => {      
    const idOrg = Number(localStorage.getItem('idOrg'));

    const getDepartmentNames= () => {
      CallGetAllDepartmentsFromOrg(idOrg).then((r)=> {
        const cont = r.length;
        let container: String[] = ['Sin departamento'];
        for (var i = 0; i < cont; i++) {
          container.push(r[i].name)
        }
        setDepartNames(container);
      })
    }


    const GetAssets = () => {
      CallGetOrganizationAssets(idOrg).then(async (response) => {
        const cont = response[0].length;
        const contEdit = response[1].length;
        let container: AssetsInList[] = [];
        //let object = new container;
        for (var i = 0; i < cont; i++) {
          const asset: AssetsInList = {
            name: response[0][i].name,
            assetType: response[0][i].assetType,
            assetDepart: Number(response[0][i].assetDepart),
            assetTS: AssetTypes[response[0][i].assetType],
            creationDate: Number(response[0][i].creationDate),
            adquireDate: Number(response[0][i].adquireDate),
            originalId: Number(response[0][i].index),
            index: Number(response[0][i].index)
          }
          if(asset.creationDate === 0  && asset.adquireDate === 0) continue;
          else {
            container.push(asset);
          }
          
        }
        for (var o = 0; o < contEdit; o++) {
          const originalAsset = await CallGetAsset(response[1][o].originalAssetId);
          console.log('depart'+Number(originalAsset.assetDepart))
          const asset: AssetsInList = {
            name: response[1][o].name,
            assetType: response[1][o].assetType,
            assetTS: AssetTypes[response[1][o].assetType],
            assetDepart:  Number(originalAsset.assetDepart),
            creationDate: Number(response[1][o].creationDate),
            adquireDate: Number(response[1][o].adquireDate),
            originalId: Number(response[1][o].originalAssetId),
            index: Number(response[1][o].index),
          }
          console.log("DEPARTMENT ASSET"+ Number(response[1][o].assetDepart));
          if(asset.creationDate === 0  && asset.adquireDate === 0) continue;
          else {
            console.log("Añadido")
            console.log(asset);
            container.push(asset);
          }
        }
        let commentCont:Number[] = [];
        for (var e = 0; e < container.length; e++){
          CallGetNumberOfCommentsByAsset(container[e].originalId).then((r)=> {
            commentCont.push(Number(r))
            setIsLoading(false);

          });
        }
        setNumComments(commentCont);
        setAssets(container);
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
          // hacer request a contrato
          getDepartmentNames();
          GetAssets();
          
        }
      })
      .catch(() => {
        //navigate("/login");
      });
  },[]);

  if (isLoading === true) return <PageLoged><CircularProgress /></PageLoged>
  else return (
    <PageLoged>
    <div className="my-5"><Typography variant="h5">Todos los activos</Typography></div>
    {assets!.length !== 0 && (<div className="min-h-full h-full">
      <AssetsCard props={assets} departNames={departNames} numComments={numComments} />
    </div>)}
    {assets!.length == 0 && (
    <Card>
    <div className="mx-5 mt-5 mb-10 min-h-full h-full">
      <div className="my-8 mx-48">
        <Typography>Aún no hay activos creados en esta organización. Pulsa en el botón "Nuevo Activo" para crear tu primer activo.</Typography>
        <div className='m-2'></div>
        <Typography align="center">Añadir nuevos activos a una organización permite llevar un control sobre ellos.</Typography>
      </div>
      <div className="w-full flex flex-row justify-evenly mb-5">
        <Button color="primary" variant="contained" onClick={() => window.history.back()}> Atrás </Button>
        <Button color="primary" variant="contained" onClick={() => navigate('/assets/new')}>Nuevo Activo</Button>
      </div>
    </div></Card>
    )}
    </PageLoged>
  );

  
};

export default AssetsPage;
