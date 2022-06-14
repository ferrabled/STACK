/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { CallGetAsset, CallRetrieveListOfAsset } from "components/wallet/contractCall";
import
  {
    CallGetAllDepartmentsFromOrg, CallGetAssetsIdsFromDepart
  } from "components/wallet/userCall";
import useToast from "hooks/useNotify";
import { useEffect, useState } from "react";
import { AssetsInList, AssetTypes } from "types";
import { SimpleSelectAssetsTable } from "../Table";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const AssetsDeleteModal = (props: {
  show: boolean;
  close: () => void;
  depart: boolean;
  departId: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<AssetsInList[]>();
  const [departNames, setDepartNames] = useState<string[]>();
  const [toast, setToast] = useToast();

  useEffect(() => {
    const orgId = window.localStorage.getItem("orgId");

    CallGetAllDepartmentsFromOrg(Number(orgId)).then((r) => {
      const cont = r.length;
      const container: string[] = ["Sin departamento"];
      for (let i = 0; i < cont; i++) {
        container.push(r[i].name);
      }
      setDepartNames(container);
    });

    CallGetAssetsIdsFromDepart(Number(props.departId)).then((r) => {
      console.log(r);
      const ids = r;
      CallRetrieveListOfAsset(ids).then(async ([assets, assetsEdited]) => {
        console.log(r);

        const cont = assets.length;
        const contEdit = assetsEdited.length;

        const container: AssetsInList[] = [];
        //let object = new container;
        for (let i = 0; i < cont; i++) {
          const asset: AssetsInList = {
            name: assets[i].name,
            assetType: assets[i].assetType,
            assetDepart: assets[i].assetDepart,
            assetTS: AssetTypes[assets[i].assetType],
            creationDate: Number(assets[i].creationDate),
            adquireDate: Number(assets[i].adquireDate),
            originalId: Number(assets[i].index),
            index: Number(assets[i].index),
            organizationId: assets[i].organizationId,
          };
          if (asset.creationDate === 0 && asset.adquireDate === 0) continue;
          else {
            container.push(asset);
          }
        }

        for (let o = 0; o < contEdit; o++) {
          console.log(assetsEdited[o]);
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
            console.log("Añadido");
            console.log(asset);
            container.push(asset);
          }
        }
        setAssets(container);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <div>
      {toast}
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {props.depart === true && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Eliminar activos del Departamento
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Selecciona a continuación qué activos quieres eliminar del
                departamento. Estos activos ya no pertenecerán al departamento y
                dejarán de poder editarse y ser eliminados por los usuarios del
                departamento.
              </Typography>
            </>
          )}
          {props.depart === false && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Añadir Usuario al Activo
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Selecciona a continuación qué usuarios quieres añadir al activo.
                Estos usuarios tendrán permisos para editar y eliminar el
                activo.
              </Typography>
            </>
          )}
          <div className="mb-6"></div>
          {isLoading && <Skeleton></Skeleton>}
          {!isLoading && (
            <>
              <SimpleSelectAssetsTable
                setNotifyParent={setToast}
                departNames={departNames!}
                assets={assets!}
                deleteB
              ></SimpleSelectAssetsTable>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};
export default AssetsDeleteModal;
