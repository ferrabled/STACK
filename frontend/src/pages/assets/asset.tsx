import AssetCard from "components/atoms/Cards/assetCard";
import React, { useEffect, useState } from "react";
import { CallGetAsset } from "components/wallet/contractCall";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";




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


  //TODO ASK IF THIS WOULD NEED TO BE INSIDE A USEEFFECT 
  

  useEffect(() => {
      
    const assetId = window.sessionStorage.getItem('detailId');
    if (assetId == null) navigate("/assets")
    else {
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
    }
      
  },[]);

  return <AssetCard props={asset}></AssetCard>;
};

export default AssetDetailPage;
