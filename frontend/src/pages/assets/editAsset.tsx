import { Card } from "@mui/material";
import { EditAssetForm } from "components/Forms";
import {
  CallGetAsset,
  CallGetLastAssetEdited,
} from "components/wallet/contractCall";
import { ethers } from "ethers";
import PageLoged from "pages/pageCheckLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssetEdited } from "types";

const EditAssetPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [asset, setAsset] = useState<AssetEdited>();

  useEffect(() => {
    const itemId = window.sessionStorage.getItem("editId");
    if (itemId == null) navigate("/assets");
    else {
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
          setAsset(asset);
          setIsLoading(false);
        });
      } else {
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
    <PageLoged>
      {!isLoading && (
        <Card className="my-3">
          <EditAssetForm data={asset} />
        </Card>
      )}
    </PageLoged>
  );
};

export default EditAssetPage;
