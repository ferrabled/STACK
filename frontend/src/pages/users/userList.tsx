import AssetsCard from "components/atoms/Cards/assetsCard";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import { Card, CircularProgress, containerClasses, Typography } from "@mui/material";
import { CallGetOrganizationAssets } from "components/wallet/contractCall";
import { AssetsInList, AssetTypes, Users } from "types"
import PageLoged from "pages/pageCheckLogin";
import { CallGetAllUsersFromOrg } from "components/wallet/userCall";
import { UsersCard } from "components/atoms/Cards";

declare var window: Window & { ethereum: any };

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Users[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const GetUsers = () => {
      //const idOrg = Number(localStorage.getItem('idOrg'));
      //TODO ID ORGGGG
      const idOrg = 0;
      console.log("obteniendo assets")
      CallGetAllUsersFromOrg(idOrg).then((response) => {
        console.log(response.length);
        const cont = response.length;
        let container: Users[] = [];
        for (var i = 0; i < cont; i++) {
            console.log(response[i]);
            const user: Users = {
                addr: (response[i].addr),
                name: response[i].name,
                surname: response[i].surname,
                email: response[i].email,
                telephone: Number(response[i].telephone),
                orgId: Number(response[i].orgId),
                index: Number(response[i].index)
            }
        container.push(user);
        console.log(container);
        }
        setUsers(container);
        setIsLoading(false);
    
        
    
      });
      
      
      
    };



    // Ethers login
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    signer
      .getAddress()
      .then((addr) => {
        console.log(addr);
        if (!addr) {
          //navigate("/login");
        } else {
          //RETRIEVE ALL ASSETS FROM A ORGANIZATION
          // hacer request a contrato
          GetUsers();
          
        }
      })
      .catch(() => {
        //navigate("/login");
      });
  },[]);

  if (isLoading === true) return <CircularProgress />
  else return (
    <PageLoged>
    <Typography variant="h5">Usuarios de la organización</Typography>
    <Card>
    <div className="m-5 min-h-full h-full">
        <UsersCard {...users!} />
    </div></Card>
    </PageLoged>
  );

  // if (!isCorrectLogin) {
  //     return <p>EROROIRORORORORORORORRRRR NO TIENES ACCESO!!!!!</p>
  // }

  
};

export default UsersPage;
