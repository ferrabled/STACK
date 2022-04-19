import { EditAssetForm } from "components/Forms";
import { useEffect, useState } from "react";
import Page from "../page";
import { useNavigate } from "react-router-dom";
import { CallGetAsset } from "components/wallet/contractCall";
import { ethers } from "ethers";


const EditAssetPage = () => {


  type Asset = {
    name: string;
    adquireDate?: Date;
    creationDate?: Date;
    assetType?: string;
};

  const navigate = useNavigate(); 

  const [isLoading, setIsLoading] = useState(true);
  const [itemId, setItemId] = useState("");
  const [asset, setAsset] = useState<Asset>();
  

  useEffect(() => {
    const itemId = window.sessionStorage.getItem('editId');
    if (itemId == null) navigate("/assets")
    else {
      setItemId(itemId);
      CallGetAsset(Number(itemId)).then((response) => {
        const asset: Asset = {
          name: response["name"],
          adquireDate: new Date(Number(ethers.BigNumber.from(response["adquireDate"]))),
          creationDate: new Date (Number(ethers.BigNumber.from(response["creationDate"]))),
          assetType: response["assetType"]
      };
      console.log(asset)
      setAsset(asset);
      setIsLoading(false)
      });
    }
  }, []);

  return (
    <Page title="">
      <div>{itemId}</div>
        {!isLoading && <EditAssetForm data={asset!} />}
    </Page>
  );
};

export default EditAssetPage;