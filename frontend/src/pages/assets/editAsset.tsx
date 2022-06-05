import { Card } from "@mui/material";
import { EditAssetForm } from "components/Forms";
import
  {
    CallGetAsset,
    CallGetLastAssetEdited
  } from "components/wallet/contractCall";
import PageLoged from "pages/pageCheckLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Asset, AssetEdited } from "types";

const EditAssetPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [asset, setAsset] = useState<AssetEdited | Asset>();

  useEffect(() => {
    const itemId = window.sessionStorage.getItem("editId");
    if (itemId == null) navigate("/assets");
    else {
      if (window.sessionStorage.getItem("isEdited") === "false") {
        CallGetAsset(Number(itemId)).then((response) => {
          setAsset(response);
          setIsLoading(false);
        });
      } else {
        CallGetLastAssetEdited(Number(itemId)).then((response) => {
          console.log(asset);
          setAsset(response);
          setIsLoading(false);
        });
      }
    }
  }, []);

  return (
    <PageLoged>
      {!isLoading && asset && (
        <Card className="my-3">
          <EditAssetForm data={asset} />
        </Card>
      )}
    </PageLoged>
  );
};

export default EditAssetPage;
