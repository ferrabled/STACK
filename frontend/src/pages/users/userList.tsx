import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import EmailIcon from "@mui/icons-material/Email";
import {
  Button,
  Card,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import { UsersCard } from "components/atoms/Cards";
import { CallGetAllUsersFromOrg } from "components/wallet/userCall";
import { ethers } from "ethers";
import PageLoged from "pages/pageCheckLogin";
import React, { useEffect, useState } from "react";
import { TableUser } from "types";
import { sendInviteEmail } from "utils";

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<TableUser[]>();
  const [finalUrl, setFinalUrl] = useState("");

  useEffect(() => {
    const GetUsers = () => {
      const orgId = Number(localStorage.getItem("orgId"));
      console.log("obteniendo Usuarios de la org" + orgId);
      CallGetAllUsersFromOrg(orgId).then((response) => {
        console.log(response.length);
        const cont = response.length;
        const container: TableUser[] = [];
        for (let i = 0; i < cont; i++) {
          console.log(response[i]);
          const user: TableUser = {
            addr: response[i].addr,
            name: response[i].name,
            surname: response[i].surname,
            email: response[i].email,
            telephone: response[i].telephone,
            orgId: Number(response[i].orgId),
            index: Number(response[i].index),
          };
          container.push(user);
          console.log(container);
        }
        setUsers(container);
        setIsLoading(false);
      });
    };

    const baseUrl =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port +
      "/";
    const orgId = window.localStorage.getItem("orgId");
    const finalUrl = baseUrl + "organization/" + orgId + "/register";
    setFinalUrl(finalUrl);

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
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(finalUrl);
  }

  function handleEmail() {
    const orgId = window.localStorage.getItem("orgId");
    sendInviteEmail(finalUrl, Number(orgId)).then(
      (emailurl) => (window.location.href = emailurl)
    );
  }

  if (isLoading === true) return <CircularProgress />;
  else
    return (
      <PageLoged>
        <div className="my-5">
          <Typography variant="h5">Usuarios de la organización</Typography>
        </div>
        {users && users?.length !== 0 && (
          <Card>
            <div className="m-5 min-h-full h-full">
              <UsersCard users={users} />
              <div className="mt-8">
                <Typography align="center">
                  Puedes invitar a nuevos usuarios copiando el siguiente enlace
                  o enviando un correo
                </Typography>
              </div>
              <div className="flex flex-row items-center justify-center gap-8 mt-3">
                <Typography>
                  <Link href={finalUrl} target="_blank">
                    {finalUrl}
                  </Link>
                </Typography>
                <Button onClick={() => handleCopy()}>
                  {" "}
                  Copiar <ContentPasteIcon />
                </Button>
                <Button onClick={() => handleEmail()}>
                  {" "}
                  Enviar <EmailIcon />
                </Button>
              </div>
            </div>
          </Card>
        )}
        {users?.length == 0 && (
          <Card>
            <div className="m-5 min-h-full h-full">
              <div className="my-8 mx-48">
                <Typography>
                  Aún no hay usuarios pertenecientes a la organización. Para
                  invitar a nuevos usuarios puedes copiar el enlace de registro
                  pulsando en &quot;Copiar&quot;.
                </Typography>
                <div className="m-2"></div>
                <Typography align="center">
                  Añadir nuevos usuarios a una organización permite que esos
                  usuarios puedan tener acceso a los activos de la organización
                </Typography>
              </div>
              <div className="flex flex-row items-center justify-center gap-8 my-3">
                <Typography>
                  <Link href={finalUrl} target="_blank">
                    {finalUrl}
                  </Link>
                </Typography>
                <Button onClick={() => handleCopy()}>
                  {" "}
                  Copiar <ContentPasteIcon />
                </Button>
                <Button onClick={() => handleEmail()}>
                  {" "}
                  Enviar <EmailIcon />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </PageLoged>
    );
};

export default UsersPage;
