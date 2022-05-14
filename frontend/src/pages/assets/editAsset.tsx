import { EditAssetForm } from "components/Forms";
import { useEffect, useState } from "react";
import Page from "../page";
import { useNavigate } from "react-router-dom";
import { CallGetAsset, CallGetLastAssetEdited } from "components/wallet/contractCall";
import { ethers } from "ethers";
import { AssetEdited } from "types";
import PageLoged from "pages/pageCheckLogin";
import { Card } from "@mui/material";

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
      {!isLoading &&
        <Card className="my-3">
          <EditAssetForm data={asset!} />
        </Card>
        }
    </PageLoged>
  );
};

export default EditAssetPage;
