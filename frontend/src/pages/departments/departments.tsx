import { Button, Card, CircularProgress, Typography } from "@mui/material";
import DepartmentTable from "components/atoms/Table/DepartmentsTable";
import { CallGetAllDepartmentsFromOrg } from "components/wallet/userCall";
import PageLoged from "pages/pageCheckLogin";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Department } from "types";

const DepartmentsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState<Department[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const GetDepartments = () => {
      const idOrg = Number(localStorage.getItem("idOrg"));
      console.log("obteniendo departamentos de org " + idOrg);
      CallGetAllDepartmentsFromOrg(idOrg).then((response) => {
        console.log(response);
        const cont = response.length;
        const container: Department[] = [];
        for (let i = 0; i < cont; i++) {
          console.log(response[i]);
          console.log(i);
          const department: Department = {
            name: response[i].name,
            description: response[i].description,
            telephone: response[i].telephone,
            orgId: Number(response[i].orgId),
            id: Number(response[i].index),
            index: Number(response[i].index),
          };
          container.push(department);
        }
        setDepartments(container);
        setIsLoading(false);
      });
    };
    GetDepartments();
  }, []);

  if (isLoading === true) return <CircularProgress />;
  else
    return (
      <PageLoged>
        <div className="my-5">
          <Typography variant="h5">Todos los departamentos</Typography>
        </div>
        <Card className="gap-7 p-10 flex flex-col items-center h-full">
          {departments && departments.length !== 0 && (
            <div className="min-h-full h-full w-full">
              <DepartmentTable departments={departments} />
            </div>
          )}
          {(!departments || departments.length == 0) && (
            <>
              <div className="mb-5 mx-48">
                <Typography>
                  Aún no hay departamentos en la organización.
                </Typography>
                <div className="m-2"></div>
                <Typography align="center">
                  Puedes crear un departamento nuevo haciendo click en el
                  siguiente botón
                </Typography>
              </div>
            </>
          )}
          <div className="w-full flex flex-row justify-evenly">
            <Button
              color="primary"
              variant="contained"
              onClick={() => window.history.back()}
            >
              {" "}
              Atrás{" "}
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => navigate("/departments/new")}
            >
              Nuevo Departamento
            </Button>
          </div>
        </Card>
      </PageLoged>
    );
};

export default DepartmentsPage;
