import AssetsCard from "components/atoms/Cards/assetsCard";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import { Button, CircularProgress, containerClasses, Typography } from "@mui/material";
import { AssetsInList, AssetTypes, Department } from "types"
import PageLoged from "pages/pageCheckLogin";
import { CallGetAllDepartmentsFromOrg } from "components/wallet/userCall";
import DepartmentTable from "components/atoms/Table/DepartmentsTable";

declare var window: Window & { ethereum: any };

const DepartmentsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState<Department[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const GetDepartments = () => {
      const idOrg = Number(localStorage.getItem('idOrg'));
      console.log("obteniendo departamentos de org "+idOrg);
      CallGetAllDepartmentsFromOrg(idOrg).then((response) => {
        console.log(response);
        const cont = response.length;
        let container: Department[] = [];
        for (var i = 0; i < cont; i++) {
          console.log(response[i]);
          console.log(i);
          const department: Department = {
            name: response[i].name,
            description: response[i].description,
            telephone: Number(response[i].telephone),
            orgId: Number(response[i].orgId),
            id: Number(response[i].index),
            index: Number(response[i].index)
          }        
        container.push(department);
        }
        setDepartments(container);
        setIsLoading(false);
      });
      
      
      
    };
    GetDepartments();
  },[]);

  if (isLoading === true) return <CircularProgress />
  else return (
    <PageLoged>
        <Typography variant="h5">Todos los departamentos</Typography>
        <div className="min-h-full h-full">
            <DepartmentTable {...departments!} />
        </div>
        <Button color="primary" variant="contained" onClick={()=> navigate('/departments/new')}>Nuevo Departamento</Button>
    </PageLoged>
  );  
};

export default DepartmentsPage;
