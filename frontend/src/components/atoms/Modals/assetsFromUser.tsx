import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Skeleton } from "@mui/material";
import { CallGetUserAssets } from "components/wallet/userCall";
import { CallRetrieveListOfAsset } from "components/wallet/contractCall";
import { useEffect, useState } from "react";
import { AssetsInList, AssetTypes } from "types";
import SimpleAssetsTable from "../Table/simpleAssetsTable";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = (props: any) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [assetId, setAssetId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<AssetsInList[]>();

  useEffect(() => {
    console.log(props);
    if (!props.show) return;
    setIsLoading(true);

    const refactorAssets = (response: any) => {
      console.log(response);
      const cont = response[0].length;
      const contEdit = response[1].length;
      let container: AssetsInList[] = [];
      for (var i = 0; i < cont; i++) {
        const asset: AssetsInList = {
          name: response[0][i].name,
          assetType: response[0][i].assetType,
          assetTS: AssetTypes[response[0][i].assetType],
          creationDate: Number(response[0][i].creationDate),
          adquireDate: Number(response[0][i].adquireDate),
          originalId: Number(response[0][i].index),
          index: Number(response[0][i].index),
        };
        //TODO CHECK IF IT RETURNS ANY ASSET DELETED
        if (asset.creationDate === 0 && asset.adquireDate === 0) continue;
        else {
          container.push(asset);
        }
      }

      for (var o = 0; o < contEdit; o++) {
        const asset: AssetsInList = {
          name: response[1][o].name,
          assetType: response[1][o].assetType,
          assetTS: AssetTypes[response[1][o].assetType],
          creationDate: Number(response[1][o].creationDate),
          adquireDate: Number(response[1][o].adquireDate),
          originalId: Number(response[1][o].originalAssetId),
          index: Number(response[1][o].index),
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
      setAssetId(props.userId);
      if (props.userId !== "") {
        CallGetUserAssets(Number(props.userId)).then((r) => {
          console.log(r);
          CallRetrieveListOfAsset(r).then((response) => {
            if (response[0].length !== 0 || response[1].length !== 0) {
              setIsEmpty(false);
              refactorAssets(response);
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
              {!isEmpty && <SimpleAssetsTable {...assets!} />}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};
export default BasicModal;
