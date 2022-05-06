import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Department, Users } from "types";
import PageLoged from "pages/pageCheckLogin";
import { CallGetDepartment, CallGetUsersFromDepart } from "components/wallet/userCall";
import DepartmentCard from "components/atoms/Cards/Department/departmentCard";
import { UsersCard } from "components/atoms/Cards";
import { Button, Card, Skeleton, Typography } from "@mui/material";
import { UserSelectModal } from "components/atoms/Modals";

const DepartmentPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [department, setDepartment] = useState<Department>();
  const [users, setUsers] = useState<Users[]>();
  const [usersIds, setUsersIds] = useState<Number[]>([]);
  const [assets, setAssets] = useState<Users[]>();
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
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
            console.log(r);
            console.log("AQUIIIII " +r)
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
            //TODO GET ASSETS FROM DEPARTMENT

            setIsLoading(false);
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
                <Typography variant="h6">Usuarios del Activo</Typography>
                <Button
                variant="contained"
                color="primary"
                onClick={() => handleUserModal()}
                >
                Añadir Nuevo
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
        {/* TODO ASSET ID??????? */}
        <UserSelectModal
            show={showModal!}
            depart
            close={() => setShowModal(false)}
            usersIds={usersIds!}
        />



    </PageLoged>
  );
};

export default DepartmentPage;