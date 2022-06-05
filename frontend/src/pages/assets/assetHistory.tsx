import { Typography } from "@mui/material";
import AssetRecordCard from "components/atoms/Cards/Assets/assetRecordCard";
import { CallGetRecordList } from "components/wallet/contractCall";
import PageLoged from "pages/pageCheckLogin";
import React, { useEffect, useState } from "react";
import { AssetsInList, AssetTypes } from "types";

const AssetHistoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<AssetsInList[]>();
  const [originalAsset, setOriginal] = useState<AssetsInList>();

  useEffect(() => {
    const id = window.sessionStorage.getItem("detailId");

    CallGetRecordList(Number(id)).then((response) => {
      console.log(response);
      const [asset, assetsEdited] = response;
      const len = assetsEdited.length;
      const container: AssetsInList[] = [];

      const assetOriginal: AssetsInList = {
        name: asset.name,
        assetType: asset.assetType,
        assetTS: AssetTypes[asset.assetType],
        assetDepart: asset.assetDepart,
        creationDate: Number(asset.creationDate),
        adquireDate: Number(asset.adquireDate),
        originalId: Number(asset.index),
        index: Number(asset.index),
      };
      console.log(assetOriginal);
      setOriginal(assetOriginal);

      container.push(assetOriginal);

      for (let i = 0; i < len; i++) {
        const asset: AssetsInList = {
          name: assetsEdited[i].name,
          assetType: assetsEdited[i].assetType,
          assetTS: AssetTypes[assetsEdited[i].assetType],
          assetDepart: assetOriginal.assetDepart,
          creationDate: Number(assetsEdited[i].creationDate),
          adquireDate: Number(assetsEdited[i].adquireDate),
          originalId: Number(assetsEdited[i].originalAssetId),
          index: Number(assetsEdited[i].index),
        };
        console.log("Asset editado añadido con id");
        container.push(asset);
      }
      console.log("container");
      console.log(container);
      setAssets(container);
      setIsLoading(false);
    });
  }, []);
  
  return (
    <PageLoged>
      {!isLoading && (
        <>
          <Typography variant="h5">
            Historial del activo: {originalAsset!.name}
          </Typography>
          <AssetRecordCard assets={assets!} />
        </>
      )}
    </PageLoged>
  );
};

export default AssetHistoryPage;
