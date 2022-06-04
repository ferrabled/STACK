import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CallGetAllDepartmentsFromOrg,
  CallGetAllUsersFromOrg,
  CallGetAssetsIdsFromDepart,
  CallGetUsersFromDepart,
} from "components/wallet/userCall";
import { UsersCard } from "../Cards";
import { AssetsInList, AssetTypes, Users } from "types";
import EnhancedTable from "../Table/simpleUserTable";
import SimpleUserTable from "../Table/simpleUserTable";
import { CallRetrieveListOfAsset } from "components/wallet/contractCall";
import { SimpleSelectAssetsTable } from "../Table";
import Notification from "components/notification";


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

const AssetsDeleteModal = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<AssetsInList[]>();
  const [departNames, setDepartNames] = useState<string[]>();
  const [notify, setNotify] = useState<any>({isOpen:false, message:'', type:'info'})



  useEffect(() => {
    console.log("QUE HEMOS RECIBIDO " + props.usersIds);
    console.log(props.usersIds);
    const orgId = window.localStorage.getItem("orgId");

    CallGetAllDepartmentsFromOrg(Number(orgId)).then((r)=> {
      const cont = r.length;
      const container: string[] = ['Sin departamento'];
      for (let i = 0; i < cont; i++) {
        container.push(r[i].name)
      }
      setDepartNames(container);
    })

    CallGetAssetsIdsFromDepart(Number(props.departId!)).then((r) => {
      console.log(r);
      const ids = r;
      CallRetrieveListOfAsset(ids).then((response) => {
        console.log(r);

        const cont = response[0].length;
        const contEdit = response[1].length;

        const container: AssetsInList[] = [];
        //let object = new container;
        for (let i = 0; i < cont; i++) {
          const asset: AssetsInList = {
            name: response[0][i].name,
            assetType: response[0][i].assetType,
            assetDepart: response[0][i].assetDepart,
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

        for (let o = 0; o < contEdit; o++) {
          console.log(response[1][o]);
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
      <Notification {...notify}></Notification>
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
                departamento. Estos activos ya no pertenecerán al departamento
                y dejarán de poder editarse y ser eliminados por los usuarios del departamento.
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
          {/* TODO SEND data */}
          {!isLoading && (
            <>
              <SimpleSelectAssetsTable
                setNotifyParent={setNotify}
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
