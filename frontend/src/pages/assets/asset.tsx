import AssetCard from "components/atoms/Cards/assetCard";
import
  {
    CallGetAsset,
    CallGetAssetEdited,
    CallGetLastAssetEdited
  } from "components/wallet/contractCall";
import PageLoged from "pages/pageCheckLogin";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Asset, AssetEdited } from "types";

const AssetDetailPage = () => {
  const navigate = useNavigate();
  const [asset, setAsset] = useState<AssetEdited | Asset | null>(null);

  useEffect(() => {
    const assetId = window.sessionStorage.getItem("detailId");
    const isRecord = window.sessionStorage.getItem("record");
    if (isRecord?.includes("o")) {
      CallGetAsset(Number(assetId)).then((response) => {
        setAsset(response);
      });
    } else if (isRecord?.includes("y")) {
      console.log("hola");
      console.log("Retrieve specific asset edited");
      const len = window.sessionStorage.getItem("record")?.length??0;
      const assetId = window.sessionStorage
        .getItem("record")
        ?.substring(1, len - 1);
      CallGetAssetEdited(Number(assetId)).then((response) => {
        console.log("Obtenemos el asset");
        setAsset(response);
      });
    } else {
      if (assetId == null) navigate("/assets");
      else {
        if (window.sessionStorage.getItem("isEdited") === "false") {
          CallGetAsset(Number(assetId)).then((response) => {
            console.log(asset);
            setAsset(response);
          });
        } else {
          console.log("Asset ya editado anteriormente");
          console.log(assetId);
          CallGetLastAssetEdited(Number(assetId)).then((response) => {
            setAsset(response);
          });
        }
      }
    }
  }, []);

  return (
    <PageLoged>
      {asset && <AssetCard asset={asset}></AssetCard>}
    </PageLoged>
  );
};

export default AssetDetailPage;
