import { Typography } from "@mui/material";
import AssetRecordCard from "components/atoms/Cards/Assets/assetRecordCard";
import { CallGetRecordList } from "components/wallet/contractCall";
import PageLoged from "pages/pageCheckLogin";
import React, { useEffect, useState } from "react";
import { AssetsInList } from "types";

const AssetHistoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<AssetsInList[]>();
  const [originalAsset, setOriginal] = useState<AssetsInList>();

  useEffect(() => {
    const id = window.sessionStorage.getItem("detailId");

    CallGetRecordList(Number(id)).then((response) => {
      console.log(response);
      const len = response[1].length;
      const container: AssetsInList[] = [];

      const assetOriginal: AssetsInList = {
        name: response[0].name,
        assetType: response[0].assetType,
        assetDepart: response[0].assetDepart,
        creationDate: Number(response[0].creationDate),
        adquireDate: Number(response[0].adquireDate),
        originalId: Number(response[0].index),
        index: Number(response[0].index),
      };
      console.log(assetOriginal);
      setOriginal(assetOriginal);

      container.push(assetOriginal);

      for (let i = 0; i < len; i++) {
        const asset: AssetsInList = {
          name: response[1][i].name,
          assetType: response[1][i].assetType,
          assetDepart: response[1][i].assetDepart,
          creationDate: Number(response[1][i].creationDate),
          adquireDate: Number(response[1][i].adquireDate),
          originalId: Number(response[1][i].originalAssetId),
          index: Number(response[1][i].index),
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
            Historial del activo: {originalAsset.name}
          </Typography>
          <AssetRecordCard assets={assets} />
        </>
      )}
    </PageLoged>
  );
};

export default AssetHistoryPage;
