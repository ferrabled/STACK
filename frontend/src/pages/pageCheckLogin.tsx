import { Box } from "@mui/material";
import { ethers } from "ethers";
import useToast from "hooks/useNotify";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "types";
import AppFooter from "./footer";

const PageLoged = (props: { children?: React.ReactNode }) => {
  const [toast, setToast] = useToast();

  const navigate = useNavigate();

  function notifyChange() {
    const text =
      "Se ha producido un cambio de billetera, por favor vuelva a iniciar sesión";
    const notify: Notify = { isOpen: true, message: text, type: "error" };
    setToast(notify);
  }

  useEffect(() => {
    const connect = () => {
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
          const text = "Por favor conecta tu billetera correctamente";
          const notify: Notify = { isOpen: true, message: text, type: "error" };
          setToast(notify);
          setTimeout(function () {
            navigate("/login");
          }, 5000);
        });
    };

    async function listenMMAccount() {
      window.ethereum.on("accountsChanged", async function () {
        window.localStorage.clear();
        notifyChange();
        setTimeout(function () {
          navigate("/login");
        }, 5000);
      });
    }
    connect();
    listenMMAccount();
  }, []);

  return (
    <section className="block w-full py-5 px-16 md:px-8 lg:px-24 xl:px-48 mui:left-[250px] mui:w-[calc(100%-250px)] absolute flex flex-col items-center bg-[#f6f6f6]">
      {toast}
      <Box className="w-full max-w-7xl mt-10">{props.children}</Box>
      <AppFooter />
    </section>
  );
};

export default PageLoged;
