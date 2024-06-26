import { Button, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import {
  CallGetAdminToOrg,
  CallIsAdministrator,
} from "components/wallet/contractCall";
import { CallGetUserFromAddr, CallIsUser } from "components/wallet/userCall";
import { Notify } from "types";

const ConnectButton = ({
  setNotifyParent,
}: {
  setNotifyParent: (n: Notify) => void;
}) => {
  const navigate = useNavigate();

  const GetData = async (provider: ethers.providers.Web3Provider) => {
    console.log("User Wallet: ");
    const signer = provider.getSigner();
    signer.getAddress().then((addr) => {
      console.log(addr);

      //Retrieve if user has organization
      CallIsAdministrator(addr)
        .then((isAdmin) => {
          if (isAdmin === true) {
            console.log("User is an administrator");
            const text =
              "Inicio de sesión de administrador correcto, redirigiendo...";
            setNotifyParent({ isOpen: true, message: text, type: "success" });
            CallGetAdminToOrg(addr).then((response) => {
              const orgId = Number(ethers.BigNumber.from(response));
              console.log(orgId);
              window.localStorage.setItem("orgId", String(orgId));
              window.localStorage.setItem("userAddress", String(addr));
              window.localStorage.setItem("isAdmin", "true");
              setTimeout(function () {
                navigate("/home");
              }, 2000);
            });
          } else {
            console.log("user not admin");
            CallIsUser(addr).then((isIndeed) => {
              if (isIndeed === true) {
                CallGetUserFromAddr(addr).then((r) => {
                  console.log("user is not an administrator");
                  const orgId = Number(r.orgId);
                  window.localStorage.setItem("orgId", String(orgId));
                  window.localStorage.setItem("userAddress", String(addr));
                  window.localStorage.setItem("isAdmin", "false");
                  const text =
                    "Inicio de sesión de usuario correcto, redirigiendo...";
                  setNotifyParent({
                    isOpen: true,
                    message: text,
                    type: "success",
                  });
                  setTimeout(function () {
                    navigate("/home");
                  }, 2000);
                });
              } else {
                const text =
                  "Esta billetera no pertenece a ningún usuario registrado";
                setNotifyParent({
                  isOpen: true,
                  message: text,
                  type: "error",
                });
              }
            });
          }
        }).catch((e) => {});
    });
  };

  // Connect to MetaMask wallet
  const connect = () => {
    window.localStorage.clear();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .send("eth_requestAccounts", [])
      .then(() => {
        console.log("Connect success");
        console.log("Retrieving Data from user");
        GetData(provider);
      })
      .catch(() => {
        const text = "Por favor, conecte su billetera Metamask";
        setNotifyParent({ isOpen: true, message: text, type: "error" });
      });
  };

  return (
    <Button
      className="w-80 h-24"
      variant="contained"
      color="primary"
      onClick={connect}
    >
      <Typography variant="h6">Ya tengo cuenta</Typography>
    </Button>
  );
};

export default ConnectButton;
