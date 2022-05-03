import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { CallGetAllUsersFromOrg } from "components/wallet/userCall";
import { UsersCard } from "../Cards";
import { Users } from "types";
import EnhancedTable from "../Table/simpleUserTable";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const UsersFAModal = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Users[]>();

  useEffect(() => {
    console.log(props.assetId);
    const orgId = window.localStorage.getItem("orgId");
    

    CallGetAllUsersFromOrg(Number(orgId!)).then((response) => {
      console.log(response.length);
      const cont = response.length;
      let container: Users[] = [];
      for (var i = 0; i < cont; i++) {
        console.log(response[i]);
        const user: Users = {
          addr: response[i].addr,
          name: response[i].name,
          surname: response[i].surname,
          email: response[i].email,
          telephone: Number(response[i].telephone),
          orgId: Number(response[i].orgId),
          index: Number(response[i].index),
        };
        container.push(user);
        console.log(container);
        setUsers(container);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Añadir Usuario al Activo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Selecciona a continuación qué usuarios quieres añadir al activo.
            Estos usuarios tendrán permisos para editar y eliminar el activo.
          </Typography>
          <div className="mb-6"></div>
          {isLoading && <Skeleton></Skeleton> }
          {!isLoading && <EnhancedTable {...users!}></EnhancedTable>}
        </Box>
      </Modal>
    </div>
  );
};
export default UsersFAModal;
