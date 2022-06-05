import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { CallGetAsset, CallRetrieveListOfAsset } from "components/wallet/contractCall";
import { CallGetUserAssets } from "components/wallet/userCall";
import { useEffect, useState } from "react";
import { AssetsInList, AssetTypes, Asset, AssetEdited } from "types";
import SimpleAssetsTable from "../Table/simpleAssetsTable";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = (props: {
  show: boolean;
  close: () => void;
  userId: string;
}) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<AssetsInList[]>();

  useEffect(() => {
    console.log(props);
    if (!props.show) return;
    setIsLoading(true);

    const refactorAssets = async ([assets, assetsEdited]: [
      Asset[],
      AssetEdited[]
    ]) => {
      const cont = assets.length;
      const contEdit = assetsEdited.length;
      const container: AssetsInList[] = [];
      for (let i = 0; i < cont; i++) {
        const asset: AssetsInList = {
          name: assets[i].name,
          assetType: assets[i].assetType,
          assetTS: AssetTypes[assets[i].assetType],
          assetDepart: assets[i].assetDepart,
          creationDate: Number(assets[i].creationDate),
          adquireDate: Number(assets[i].adquireDate),
          originalId: Number(assets[i].index),
          index: Number(assets[i].index),
        };
        //TODO CHECK IF IT RETURNS ANY ASSET DELETED
        if (asset.creationDate === 0 && asset.adquireDate === 0) continue;
        else {
          container.push(asset);
        }
      }

      for (let o = 0; o < contEdit; o++) {
        const originalAsset = await CallGetAsset(
          assetsEdited[o].originalAssetId
        );
        const asset: AssetsInList = {
          name: assetsEdited[o].name,
          assetType: assetsEdited[o].assetType,
          assetTS: AssetTypes[assetsEdited[o].assetType],
          assetDepart: originalAsset.assetDepart,
          creationDate: Number(assetsEdited[o].creationDate),
          adquireDate: Number(assetsEdited[o].adquireDate),
          originalId: Number(assetsEdited[o].originalAssetId),
          index: Number(assetsEdited[o].index),
        };
        if (asset.creationDate === 0 && asset.adquireDate === 0) continue;
        else {
          container.push(asset);
        }
      }
      setAssets(container);
      setIsLoading(false);
    };

    console.log(props.show);
    if (props.show) {
      // setAssetId(props.userId);
      if (props.userId !== "") {
        CallGetUserAssets(Number(props.userId)).then((r) => {
          console.log(r);
          CallRetrieveListOfAsset(r).then(async (response) => {
            if (response[0].length !== 0 || response[1].length !== 0) {
              setIsEmpty(false);
              await refactorAssets(response);
            } else {
              setIsEmpty(true);
              setIsLoading(false);
            }
          });
        });
      }
    }
  }, [props.show, props.userId]);

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Activos del Usuario {props.userId + 1}
          </Typography>
          {isLoading && <Skeleton></Skeleton>}
          {!isLoading && (
            <>
              {isEmpty && (
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Este usuario aún no tiene activos asignados. Puedes asignarle
                  activos desde la vista detallada de cualquier activo.
                </Typography>
              )}
              {!isEmpty && <SimpleAssetsTable assets={assets!} />}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};
export default BasicModal;
