import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Notification from "components/notification";
import { CallGetOrganizationAssets } from "components/wallet/contractCall";
import { CallGetAllDepartmentsFromOrg } from "components/wallet/userCall";
import { useEffect, useState } from "react";
import { AssetsInList, AssetTypes } from "types";
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

const AssetsDepartModal = (props: any) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<AssetsInList[]>();
  const [departNames, setDepartNames] = useState<string[]>();
  const [notify, setNotify] = useState<any>({isOpen:false, message:'', type:'info'})



  useEffect(() => {
    console.log(props);
    if (!props.show) return;
    setIsLoading(true);

    const getDepartmentNames= () => {
      CallGetAllDepartmentsFromOrg(Number(orgId)).then((r)=> {
        const cont = r.length;
        const container: string[] = ['Sin departamento'];
        for (let i = 0; i < cont; i++) {
          container.push(r[i].name)
        }
        setDepartNames(container);
      })
    }

    const refactorAssets = (response: any) => {
      console.log(response);
      const cont = response[0].length;
      const contEdit = response[1].length;
      const container: AssetsInList[] = [];
      for (let i = 0; i < cont; i++) {
        const asset: AssetsInList = {
          name: response[0][i].name,
          assetType: response[0][i].assetType,
          assetTS: AssetTypes[response[0][i].assetType],
          assetDepart: response[0][i].assetDepart,
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

      for (let o = 0; o < contEdit; o++) {
        const asset: AssetsInList = {
          name: response[1][o].name,
          assetType: response[1][o].assetType,
          assetTS: AssetTypes[response[1][o].assetType],
          assetDepart: response[1][o].assetDepart,
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

    const orgId = window.localStorage.getItem("orgId");
    getDepartmentNames();
    CallGetOrganizationAssets(Number(orgId)).then((r) => {
        console.log(r);
        if (r[0].length !== 0 || r[1].length !== 0) {
            setIsEmpty(false);
            refactorAssets(r);
          } else {
            setIsEmpty(true);
            setIsLoading(false);
          }
    });

  }, [props.show, props.userId]);

  return (
    <div>
      <Notification {...notify}></Notification>
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
              {!isEmpty && <SimpleSelectAssetsTable 
              setNotifyParent={setNotify}
              departNames={departNames} 
              assets={assets} 
              deleteB={false} />}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};
export default AssetsDepartModal;
