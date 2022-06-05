/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { CallGetAsset, CallGetOrganizationAssets } from "components/wallet/contractCall";
import { CallGetAllDepartmentsFromOrg } from "components/wallet/userCall";
import useToast from "hooks/useNotify";
import { useEffect, useState } from "react";
import { Asset, AssetEdited, AssetsInList, AssetTypes } from "types";
import { SimpleSelectAssetsTable } from "../Table";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const AssetsDepartModal = (props: { show: boolean; close: () => void }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<AssetsInList[]>();
  const [departNames, setDepartNames] = useState<string[]>();
  const [toast, setToast] = useToast();

  useEffect(() => {
    console.log(props);
    if (!props.show) return;
    setIsLoading(true);

    const getDepartmentNames = () => {
      CallGetAllDepartmentsFromOrg(Number(orgId)).then((r) => {
        const cont = r.length;
        const container: string[] = ["Sin departamento"];
        for (let i = 0; i < cont; i++) {
          container.push(r[i].name);
        }
        setDepartNames(container);
      });
    };

    const refactorAssets = async ([assets, assetsEdited]: [Asset[], AssetEdited[]]) => {
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

    const orgId = window.localStorage.getItem("orgId");
    getDepartmentNames();
    CallGetOrganizationAssets(Number(orgId)).then(async (r) => {
      console.log(r);
      if (r[0].length !== 0 || r[1].length !== 0) {
        setIsEmpty(false);
        await refactorAssets(r);
      } else {
        setIsEmpty(true);
        setIsLoading(false);
      }
    });
  }, [props.show]);

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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Añadir Activos al Departamento
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
              {!isEmpty && (
                <SimpleSelectAssetsTable
                  setNotifyParent={setToast}
                  departNames={departNames!}
                  assets={assets!}
                  deleteB={false}
                />
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};
export default AssetsDepartModal;
