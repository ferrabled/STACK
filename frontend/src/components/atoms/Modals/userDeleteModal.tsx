/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { CallGetUsersFromDepart } from "components/wallet/userCall";
import { TableUser } from "types";
import SimpleUserTable from "../Table/simpleUserTable";
import useToast from "hooks/useNotify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserDeleteModal = (props: {
  show: boolean;
  close: () => void;
  depart: boolean;
  usersIds: number[];
  departId: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<TableUser[]>();
  const [toast, setToast] = useToast();

  useEffect(() => {
    CallGetUsersFromDepart(Number(props.departId)).then((response) => {
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
      }
      setUsers(container);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {toast}
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
                departamento. Estos usuarios ya no pertenecerán al departamento
                y dejarán de tener permisos para editar y eliminar los activos.
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
          {!isLoading && (
            <SimpleUserTable
              setNotifyParent={setToast}
              users={users!}
              depart={props.depart}
              idList={[]}
              deleteB
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};
export default UserDeleteModal;
