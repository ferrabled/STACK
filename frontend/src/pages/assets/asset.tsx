import AssetCard from "components/atoms/Cards/assetCard";
import React, { useEffect, useState } from "react";
import { CallGetAsset } from "components/wallet/contractCall";
import { ethers } from "ethers";




const AssetDetailPage = () => {
  
    type Asset = {
        name: string;
        adquireDate?: Date;
        creationDate?: Date;
        assetType?: string;
    };


  const [isLoading, setIsLoading] = useState(true);
  const [asset, setAsset] = useState({});


  //TODO ASK IF THIS WOULD NEED TO BE INSIDE A USEEFFECT 
  if (isLoading === true){
      
    //TODO CHECK ID OF THE ASSET
    const assetId = 2;

    CallGetAsset(assetId).then((response) => {
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
    });
    setIsLoading(false);
  }

  useEffect(() => {
    
  });

  return <AssetCard props={asset}></AssetCard>;
};

export default AssetDetailPage;
