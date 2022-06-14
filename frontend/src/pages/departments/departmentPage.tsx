import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button, Card, Skeleton, Typography } from "@mui/material";
import { UsersCard } from "components/atoms/Cards";
import DepartmentCard from "components/atoms/Cards/Department/departmentCard";
import { AssetsDepartModal, UserSelectModal } from "components/atoms/Modals";
import AssetsDeleteModal from "components/atoms/Modals/assetsDeleteModal";
import UserDeleteModal from "components/atoms/Modals/userDeleteModal";
import SimpleAssetsTable from "components/atoms/Table/simpleAssetsTable";
import { CallGetAsset, CallRetrieveListOfAsset } from "components/wallet/contractCall";
import {
  CallGetAssetsIdsFromDepart,
  CallGetDepartment,
  CallGetUsersFromDepart,
} from "components/wallet/userCall";
import PageLoged from "pages/pageCheckLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Asset,
  AssetEdited,
  AssetsInList,
  AssetTypes,
  Department,
  TableUser,
} from "types";

const DepartmentPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [department, setDepartment] = useState<Department>();
  const [users, setUsers] = useState<TableUser[]>([]);
  const [usersIds, setUsersIds] = useState<number[]>([]);
  const [assets, setAssets] = useState<AssetsInList[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalA, setShowModalA] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showDeleteAssetsModal, setShowDeleteAssetsModal] = useState(false);

  useEffect(() => {
    const refactorAssets = async ([assets, assetsEdited]: [
      Asset[],
      AssetEdited[]
    ]) => {
      const cont = assets.length;
      const contEdit = assetsEdited.length;
      console.log(cont, contEdit);
      const container: AssetsInList[] = [];
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
        };
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
          assetDepart: originalAsset.assetDepart,
          assetTS: AssetTypes[assetsEdited[o].assetType],
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
      console.log(container);
      setAssets(container);
      console.log("QUEE");
      console.log(assets);
      setIsLoading(false);
    };

    const departId = window.sessionStorage.getItem("departId");
    if (departId == null) navigate("/departments");
    else {
      CallGetDepartment(Number(departId)).then((r) => {
        console.log(r);
        const department: Department = {
          name: r.name,
          description: r.description,
          telephone: r.telephone,
          orgId: r.orgId,
        };
        setDepartment(department);
        CallGetUsersFromDepart(Number(departId)).then((r) => {
          const userList: TableUser[] = [];
          const userIds: number[] = [];
          const cont = r.length;
          console.log("EL USER");
          console.log(cont);
          for (let i = 0; i < cont; i++) {
            const user: TableUser = {
              addr: r[i].addr,
              name: r[i].name,
              surname: r[i].surname,
              email: r[i].email,
              telephone: r[i].telephone,
              orgId: Number(r[i].orgId),
              index: Number(r[i].index),
            };

            console.log(user);
            userIds.push(user.index);
            userList.push(user);
          }
          setUsers(userList);
          setUsersIds(userIds);
          console.log("USUARIOS del departamento " + userIds);
          console.log(userIds);
          CallGetAssetsIdsFromDepart(Number(departId)).then((res) => {
            console.log("Numero de assets" + res);
            const assIdList: number[] = [];
            const contId = res.length;
            for (let i = 0; i < contId; i++) {
              assIdList.push(Number(res[i]));
            }
            console.log(res);
            if (assIdList.length !== 0) {
              CallRetrieveListOfAsset(res).then(async (response) => {
                console.log("TENEMOS");
                await refactorAssets(response);
                console.log(response);
              });
            } else {
              console.log("No haay assets");
              setIsLoading(false);
            }
          });
        });
      });
    }
  }, []);

  const handleDeleteUserModal = () => {
    console.log("Add user");
    setShowDeleteUserModal(true);
  };

  const handleDeleteAssetModal = () => {
    console.log("Delete user");
    setShowDeleteAssetsModal(true);
  };

  const handleUserModal = () => {
    console.log("Delete Assets");
    setShowModal(true);
  };

  return (
    <PageLoged>
      <section>
        {department ? (
          <DepartmentCard department={department} />
        ) : (
          <Skeleton variant="rectangular" height={230} />
        )}
      </section>

      <section>
        <Card className="p-5 m-5">
          <div className="flex flex-row justify-between content-evenly p-1 mb-3">
            <Typography variant="h6">Usuarios del Departamento</Typography>
            <div className="flex flex-row gap-4">
              {!isLoading && users.length !== 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteUserModal()}
                >
                  <AddBoxIcon className="mr-2" />
                  Eliminar
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUserModal()}
              >
                <AddBoxIcon className="mr-2" /> Añadir Usuario
              </Button>
            </div>
          </div>
          {isLoading && <Skeleton variant="rectangular" height={230} />}
          {!isLoading && users && (
            <>
              {users.length == 0 && (
                <div className="my-8 mx-48">
                  <Typography>
                    Aún no hay usuarios asignados a este departamento. Para
                    asignar usuarios pulsa sobre el botón &quot;Añadir
                    Nuevo&quot;.
                  </Typography>
                  <div className="m-2"></div>
                  <Typography align="center">
                    Añadir nuevos usuarios a un departamento permite que esos
                    usuarios asignados puedan realizar cambios y eliminar el
                    activo
                  </Typography>
                </div>
              )}
              {users.length !== 0 && <UsersCard users={users} />}
            </>
          )}
        </Card>
      </section>
      <UserDeleteModal
        show={showDeleteUserModal}
        close={() => setShowDeleteUserModal(false)}
        depart
        usersIds={usersIds}
        departId={Number(window.sessionStorage.getItem("departId"))}
      />
      <UserSelectModal
        show={showModal}
        depart
        close={() => setShowModal(false)}
        usersIds={usersIds}
      />
      {
        <section>
          <Card className="p-5 m-5">
            <div className="flex flex-row justify-between content-evenly p-1 mb-3">
              <Typography variant="h6"> Activos del Departamento</Typography>
              <div className="flex flex-row gap-4">
                {!isLoading && assets.length !== 0 && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteAssetModal()}
                  >
                    <AddBoxIcon className="mr-2" />
                    Eliminar
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowModalA(true)}
                >
                  <AddBoxIcon className="mr-2" /> Añadir Activo
                </Button>
              </div>
            </div>
            {isLoading && <Skeleton variant="rectangular" height={230} />}
            {!isLoading && (
              <>
                {assets.length == 0 && (
                  <div className="my-8 mx-48">
                    <Typography>
                      Aún no hay activos asignados a este departamento. Para
                      asignar activos pulsa sobre el botón &quot;Añadir
                      Activo&quot;.
                    </Typography>
                    <div className="m-2"></div>
                    <Typography align="center">
                      Añadir nuevos activos a un departamento permite que los
                      usuarios del departamento puedan realizar cambios y
                      eliminar los activos.
                    </Typography>
                  </div>
                )}
                {assets.length !== 0 && <SimpleAssetsTable assets={assets} />}
              </>
            )}
          </Card>
          <AssetsDeleteModal
            show={showDeleteAssetsModal}
            close={() => setShowDeleteAssetsModal(false)}
            depart
            departId={Number(window.sessionStorage.getItem("departId"))}
          />

          <AssetsDepartModal
            show={showModalA}
            close={() => setShowModalA(false)}
          />
        </section>
      }
    </PageLoged>
  );
};

export default DepartmentPage;
