import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Notification from "components/notification";
import { Notify } from "types";


declare var window: any;

const PageLoged = (props: {children?: React.ReactNode;}) => {

  const [notify, setNotify] = useState<any>({isOpen:false, message:'', type:'info'})

    const navigate = useNavigate();    

  
  function notifyChange(){
    const text = "Se ha producido un cambio de billetera, por favor vuelva a iniciar sesión"
    const notify:Notify = {isOpen:true, message:text, type:'error'}; 
    setNotify(notify);
  }

    useEffect(() => {

      const connect = () => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider
          .send("eth_requestAccounts", [])
          .then((r) => {
            console.log(r);
            console.log("Connect success");
            console.log("Retrieving Data from user");
          })
          .catch(() => {
            console.log("Error conectando la billetera");
            const text = "Por favor conecta tu billetera correctamente"
            const notify:Notify = {isOpen:true, message:text, type:'error'}; 
            setNotify(notify);
            setTimeout(function(){
              navigate('/login')
            }, 5000);
          });
      };

         async function listenMMAccount() {
          window.ethereum.on("accountsChanged", async function() {
            window.localStorage.clear();
            notifyChange()
            setTimeout(function(){
              navigate('/login')
            }, 5000);
          });
        }
        connect();
        listenMMAccount();    
        const orgId = window.localStorage.getItem('orgId')
        //if(orgId == null) navigate('/login')
    },[])
   

  return (
    <section className="block w-full py-5 px-4 md:px-8 lg:px-24 xl:px-48">
      <Notification {...notify}></Notification>
      <Box>{props.children}</Box>
    </section>
  );
};

export default PageLoged;