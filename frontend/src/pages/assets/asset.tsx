import AssetCard from "components/atoms/Cards/assetCard";
import React, { useEffect, useState } from "react";
import { CallGetAsset, CallGetAssetEdited, CallGetLastAssetEdited } from "components/wallet/contractCall";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { AssetEdited } from "types";
import PageLoged from "pages/pageCheckLogin";




const AssetDetailPage = () => {
  
    type Asset = {
        name: string;
        adquireDate?: Date;
        creationDate?: Date;
        assetType?: string;
    };

    const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [asset, setAsset] = useState({});

  useEffect(() => { 
    const assetId = window.sessionStorage.getItem('detailId');
    const isRecord = window.sessionStorage.getItem('record');
    if(isRecord?.includes("o")){
        CallGetAsset(Number(assetId)).then((response) => {
          console.log("Obtenemos el asset");
          const asset: Asset = {
              name: response["name"],
              adquireDate: new Date(Number(ethers.BigNumber.from(response["adquireDate"]))),
              creationDate: new Date (Number(ethers.BigNumber.from(response["creationDate"]))),
              assetType: response["assetType"]
          };
          setAsset(asset);
          setIsLoading(false);
      });
    } else if (isRecord?.includes("y")){
      console.log("hola");
      console.log("Retrieve specific asset edited")
      const len = window.sessionStorage.getItem('record')!.length
      const assetId = window.sessionStorage.getItem('record')?.substring(1, len-1);
      CallGetAssetEdited(Number(assetId)).then((response) => {
          console.log("Obtenemos el asset");
          const asset: Asset = {
              name: response["name"],
              adquireDate: new Date(Number(ethers.BigNumber.from(response["adquireDate"]))),
              creationDate: new Date (Number(ethers.BigNumber.from(response["creationDate"]))),
              assetType: response["assetType"]
          };
          setAsset(asset);
          setIsLoading(false);
      });

    } else {
    if (assetId == null) navigate("/assets")
    else {
      if (window.sessionStorage.getItem("isEdited") === "false") {
        CallGetAsset(Number(assetId)).then((response) => {
            console.log("Obtenemos el asset");
            console.log(Number(ethers.BigNumber.from(response["adquireDate"])));
            //Create asset object for assetCard 
            const asset: Asset = {
                name: response["name"],
                adquireDate: new Date(Number(ethers.BigNumber.from(response["adquireDate"]))),
                creationDate: new Date (Number(ethers.BigNumber.from(response["creationDate"]))),
                assetType: response["assetType"]
            };
            console.log(asset)
            setAsset(asset);
            setIsLoading(false);
        });
      } else {
        console.log("Asset ya editado anteriormente")
        console.log(assetId)
        CallGetLastAssetEdited(Number(assetId)).then((response) => {
          const asset: AssetEdited = {
            name: response["name"],
            adquireDate: new Date(
              Number(ethers.BigNumber.from(response["adquireDate"]))
            ),
            creationDate: new Date(
              Number(ethers.BigNumber.from(response["creationDate"]))
            ),
            assetType: response["assetType"],
            originalAssetId: Number(assetId),
          };
          console.log(asset);
          setAsset(asset);
          setIsLoading(false);
      });
    }
   }
  }
      
  },[]);

  return (<PageLoged>
    <AssetCard props={asset}></AssetCard>
    </PageLoged>)
};

export default AssetDetailPage;
