import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssetsInList, AssetTypes, Department, Users } from "types";
import PageLoged from "pages/pageCheckLogin";
import { CallGetAssetsIdsFromDepart, CallGetDepartment, CallGetUsersFromDepart } from "components/wallet/userCall";
import DepartmentCard from "components/atoms/Cards/Department/departmentCard";
import { UsersCard } from "components/atoms/Cards";
import { Button, Card, Skeleton, Typography } from "@mui/material";
import { AssetsDepartModal, UserSelectModal } from "components/atoms/Modals";
import { CallRetrieveListOfAsset } from "components/wallet/contractCall";
import SimpleAssetsTable from "components/atoms/Table/simpleAssetsTable";

const DepartmentPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [department, setDepartment] = useState<Department>();
  const [users, setUsers] = useState<Users[]>();
  const [usersIds, setUsersIds] = useState<Number[]>([]);
  const [assets, setAssets] = useState<AssetsInList[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalA, setShowModalA] = useState(false);




  useEffect(() => {

    const refactorAssets = (response: any) => {
      console.log(response);
      const cont = response[0].length;
      const contEdit = response[1].length;
      console.log(cont, contEdit)
      const container: AssetsInList[] = [];
      for (var i = 0; i < cont; i++) {
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
  
      for (var o = 0; o < contEdit; o++) {
        const asset: AssetsInList = {
          name: response[1][o].name,
          assetType: response[1][o].assetType,
          assetDepart: response[1][o].assetDepart,
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
      console.log(container);
      setAssets(container);
      console.log("QUEE")
      console.log(assets)
      setIsLoading(false);
    };

    const departId = window.sessionStorage.getItem("departId");
    if (departId == null) navigate("/departments");
    else {
      CallGetDepartment(Number(departId)).then((r) => {
        console.log(r);
        const department:Department = {
            name: r.name,
            description: r.description,
            telephone: r.telephone,
            orgId: r.orgId
        }
        setDepartment(department);
        CallGetUsersFromDepart(Number(departId)).then((r) => {
            const userList:Users[] = [];
            const userIds:Number[] = [];
            const cont = r.length;
            console.log(cont);
            for (var i = 0; i < cont; i++) {
                const user:Users = {
                    addr: r[i].addr,
                    name: r[i].name,
                    surname: r[i].surname,
                    email: r[i].email,
                    telephone: Number(r[i].telephone),
                    orgId: Number(r[i].orgId),
                    index: Number(r[i].index),                   
                }
              console.log(user)
              userIds.push(user.index!);
              userList.push(user);                
            }
            setUsers(userList);
            setUsersIds(userIds);
            console.log("USUARIOS del departamento "+ userIds)
            console.log(userIds)
            CallGetAssetsIdsFromDepart(Number(departId)).then(res=> {
              console.log("Numero de assets"+res);
              const assIdList:Number[] = []
              const contId = res.length;
              for (var i = 0; i < contId; i++) {
                assIdList.push(Number(res[i]));
              }
              console.log(res);
              if(assIdList.length !== 0){
                CallRetrieveListOfAsset(res).then((response)=>{
                  console.log("TENEMOS")
                  refactorAssets(response);
                  console.log(response)
                });
              } else {
                console.log("No haay assets");
                setIsLoading(false);
              }
            })           
        });        
      });
    }
  }, []);

  const handleUserModal = () => {
    console.log("Add user");
    setShowModal(true);
  };

  return (
    <PageLoged>
        <section>
            <DepartmentCard {...department!}></DepartmentCard>
        </section>
        
        <section>
            <Card className="p-5 m-5">
            <div className="flex flex-row justify-between content-evenly p-1 mb-3">
                <Typography variant="h6">Usuarios del Departamento</Typography>
                <Button
                variant="contained"
                color="primary"
                onClick={() => handleUserModal()}
                >
                Añadir Usuario
                </Button>
            </div>
            {isLoading && (<Skeleton variant="rectangular" height={230}/>)}
            {!isLoading && (<>
                {(users!.length == 0) && (
                <div className="my-8 mx-48"><Typography>Aún no hay usuarios asignados a este departamento. Para asignar usuarios pulsa sobre el botón "Añadir Nuevo".</Typography><div className='m-2'></div>
                <Typography align="center">Añadir nuevos usuarios a un departamento permite que esos usuarios asignados puedan realizar cambios y eliminar el activo</Typography></div>
                )} 
                {(users!.length !== 0) && (<UsersCard {...users!} />)}
            </>
            )}
            </Card>
        </section>
        <UserSelectModal
            show={showModal!}
            depart
            close={() => setShowModal(false)}
            usersIds={usersIds!}
        />
        {<section>
            <Card className="p-5 m-5">
            <div className="flex flex-row justify-between content-evenly p-1 mb-3">
                <Typography variant="h6"> Activos del Departamento</Typography>
                <Button
                variant="contained"
                color="primary"
                onClick={() => setShowModalA(true)}
                >
                Añadir Activo
                </Button>
            </div>
            {isLoading && (<Skeleton variant="rectangular" height={230}/>)}
            {!isLoading && (<>
                {(assets!.length == 0) && (
                <div className="my-8 mx-48"><Typography>Aún no hay activos asignados a este departamento. Para asignar activos pulsa sobre el botón "Añadir Activo".</Typography><div className='m-2'></div>
                <Typography align="center">Añadir nuevos activos a un departamento permite que los usuarios del departamento puedan realizar cambios y eliminar los activos.</Typography></div>
                )} 
                {(assets!.length !== 0) && (
                  <SimpleAssetsTable {...assets}/>
                )}
            </>
            )}
            </Card>
            <AssetsDepartModal 
              show={showModalA!}
              close={() => setShowModalA(false)}
              />
        </section>}



    </PageLoged>
  );
};

export default DepartmentPage;
