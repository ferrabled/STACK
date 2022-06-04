import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button, Card, Skeleton, Typography } from "@mui/material";
import { CallDeleteAsset } from "components/wallet/contractCall";
import { CallGetAssetUsers } from "components/wallet/userCall";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "types";
import { formatDate } from "utils";
import UserSelectModal from "../Modals/userSelectModal";
import AssetTypeCard from "./Assets/assetTypeData";
import CommentsCard from "./commentsCard";
import UsersCard from "./usersCard";

const AssetCard = (props: any) => {
  const [showModal, setShowModal] = useState(false);

  const [assetId, setAssetId] = useState("");
  const [usersIds, setUsersIds] = useState<number[]>([]);
  const [assetType, setAssetType] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Users[]>();

  const DataCard = () => {
    return (
      <Card className="p-5 m-5 w-1/2 flex flex-col justify-between content-evenly">
        <div className="flex flex-col mb-5 gap-2">
          <div className="flex flex-row justify-between content-evenly  mt-2">
            <Typography variant="h6">Nombre</Typography>
            {(asset.name && <div>{asset.name}</div>) || (
              <Skeleton variant="text" width={85} height={32} />
            )}
          </div>
          <div className="flex flex-row justify-between content-evenly">
            <Typography variant="h6">Fecha de Creación</Typography>
            {(asset.name && <div>{formattedCDate}</div>) || (
              <Skeleton variant="text" width={85} height={32} />
            )}
          </div>
          <div className="flex flex-row justify-between content-evenly">
            <Typography variant="h6">Fecha de Adquisición</Typography>
            {(asset.name && <div>{formattedADate}</div>) || (
              <Skeleton variant="text" width={85} height={32} />
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <div className="flex gap-5">
            <Button variant="contained" color="primary" onClick={onClickEdit}>
              Editar
            </Button>
            <Button variant="contained" color="error" onClick={deleteAsset}>
              Eliminar
            </Button>
          </div>
          <Button variant="contained" color="primary" onClick={onClickRecord}>
            Historial
          </Button>
        </div>
      </Card>
    );
  };

  useEffect(() => {
    setAssetType(window.sessionStorage.getItem("aType")!);

    const getUsers = () => {
      //setAsset(props.props);
      setAssetId(window.sessionStorage.getItem("detailId")!);
      const id = window.sessionStorage.getItem("detailId")!;
      console.log("EN SERIO DE VRD" + id);
      CallGetAssetUsers(Number(id)).then((response) => {
        const cont = response.length;
        const userIds: number[] = [];
        const container: Users[] = [];
        for (let i = 0; i < cont; i++) {
          const user: Users = {
            addr: response[i].addr,
            name: response[i].name,
            surname: response[i].surname,
            email: response[i].email,
            telephone: Number(response[i].telephone),
            orgId: Number(response[i].orgId),
            index: Number(response[i].index),
          };
          container.push(user);
          userIds.push(user.index!);
        }
        setUsersIds(userIds);
        setUsers(container);
        setIsLoading(false);
      });
    };
    getUsers();
  }, []);

  const asset = props.props;
  const navigate = useNavigate();

  const deleteAsset = () => {
    console.log("Eliminando asset");
    CallDeleteAsset(Number(window.sessionStorage.getItem("detailId"))).then(
      (response) => {
        //TODO AWAIT FOR THE CONTRACT TO BE SIGNED IN ORDER TO NAVIGATE TO ASSETS
      }
    );
    navigate("/assets");
  };

  const onClickEdit = () => {
    window.sessionStorage.setItem(
      "editId",
      window.sessionStorage.getItem("detailId")!
    );
    navigate("edit");
  };

  const onClickRecord = () => {
    navigate("record");
  };

  const handleUserModal = () => {
    console.log("Add user");
    setShowModal(true);
  };

  const adquireDate = new Date(asset.adquireDate);
  const formattedADate = formatDate(adquireDate);
  const creationDate = new Date(asset.creationDate);
  const formattedCDate = formatDate(creationDate);

  return (
    <div>
      <section className="flex flex-row gap-4 justify-center">
        {isLoading && (
          <>
            <div className="p-5 m-5 w-1/2">
              <Skeleton variant="rectangular" height={170} />
            </div>
            <div className="p-5 m-5 w-1/2">
              <Skeleton variant="rectangular" height={170} />
            </div>
          </>
        )}

        {!isLoading && (
          <>
            <DataCard></DataCard>
            <AssetTypeCard
              assetId={Number(assetId)}
              assetType={Number(assetType)}
            ></AssetTypeCard>
          </>
        )}
      </section>
      <section>
        {isLoading && <Skeleton variant="rectangular" height={230} />}
        {!isLoading && <CommentsCard assetId={Number(assetId)}></CommentsCard>}
      </section>
      <section>
        <Card className="p-5 m-5">
          <div className="flex flex-row justify-between content-evenly p-1 mb-3">
            <Typography variant="h6">Usuarios del Activo</Typography>
            <div className="flex flex-row gap-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUserModal()}
              >
                <AddBoxIcon className="mr-2" />
                Añadir Nuevo
              </Button>
            </div>
          </div>
          {isLoading && <Skeleton variant="rectangular" height={230} />}
          {!isLoading && (
            <>
              {users!.length == 0 && (
                <div className="my-8 mx-48">
                  <Typography>
                    Aún no hay usuarios asignados a este activo. Para asignar
                    usuarios pulsa sobre el botón &quot;Añadir Nuevo&quot;.
                  </Typography>
                  <div className="m-2"></div>
                  <Typography align="center">
                    Añadir nuevos usuarios a un activo permite que esos usuarios
                    asignados puedan realizar cambios y eliminar el activo
                  </Typography>
                </div>
              )}
              {users!.length !== 0 && <UsersCard {...users!} />}
            </>
          )}
        </Card>
      </section>
      <UserSelectModal
        show={showModal!}
        close={() => setShowModal(false)}
        depart={false}
        usersIds={usersIds}
      />
    </div>
  );
};

export default AssetCard;
