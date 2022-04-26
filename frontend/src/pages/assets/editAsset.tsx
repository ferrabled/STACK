import { EditAssetForm } from "components/Forms";
import { useEffect, useState } from "react";
import Page from "../page";
import { useNavigate } from "react-router-dom";
import { CallGetAsset, CallGetLastAssetEdited } from "components/wallet/contractCall";
import { ethers } from "ethers";
import { AssetEdited } from "types";

const EditAssetPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [itemId, setItemId] = useState("");
  const [asset, setAsset] = useState<AssetEdited>();

  useEffect(() => {
    const itemId = window.sessionStorage.getItem("editId");
    if (itemId == null) navigate("/assets");
    else {
      setItemId(itemId);
      if (window.sessionStorage.getItem("isEdited") === "false") {
        CallGetAsset(Number(itemId)).then((response) => {
          const asset: AssetEdited = {
            name: response["name"],
            adquireDate: new Date(
              Number(ethers.BigNumber.from(response["adquireDate"]))
            ),
            creationDate: new Date(
              Number(ethers.BigNumber.from(response["creationDate"]))
            ),
            assetType: response["assetType"],
            originalAssetId: Number(itemId),
          };
          console.log(asset);
          setAsset(asset);
          setIsLoading(false);
        });
      } else {
        console.log("Asset ya editado anteriormente")
        console.log(itemId)
        CallGetLastAssetEdited(Number(itemId)).then((response) => {
          const asset: AssetEdited = {
            name: response["name"],
            adquireDate: new Date(
              Number(ethers.BigNumber.from(response["adquireDate"]))
            ),
            creationDate: new Date(
              Number(ethers.BigNumber.from(response["creationDate"]))
            ),
            assetType: response["assetType"],
            originalAssetId: Number(itemId),
          };
          console.log(asset);
          setAsset(asset);
          setIsLoading(false);
        });
      }
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
