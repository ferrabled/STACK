import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { CallGetUsersFromDepart } from "components/wallet/userCall";
import { Users } from "types";
import SimpleUserTable from "../Table/simpleUserTable";
import Notification from "components/notification";

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

const UserDeleteModal = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Users[]>();
  const [notify, setNotify] = useState<any>({isOpen:false, message:'', type:'info'})


  useEffect(() => {

    CallGetUsersFromDepart(Number(props.departId!)).then((response) => {
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
        setUsers(container);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div>
      <Notification {...notify}></Notification>
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {props.depart === true && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Eliminar usuarios del Departamento
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Selecciona a continuación qué usuarios quieres eliminar del
                departamento. Estos usuarios ya no pertenecerán al departamento y dejarán 
                de tener permisos para editar y
                eliminar los activos.
              </Typography>
            </>
          )}
          {props.depart === false && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Añadir Usuario al Activo
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Selecciona a continuación qué usuarios quieres añadir al activo.
                Estos usuarios tendrán permisos para editar y eliminar el
                activo.
              </Typography>
            </>
          )}
          <div className="mb-6"></div>
          {isLoading && <Skeleton></Skeleton>}
          {/* TODO SEND data */}
          {!isLoading && (
            <SimpleUserTable
              setNotifyParent={setNotify}
              users={users!}
              depart = {props.depart}
              idList={[]}
              deleteB
            ></SimpleUserTable>
          )}
        </Box>
      </Modal>
    </div>
  );
};
export default UserDeleteModal;
