import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { Licence } from "types";
import Notification from "components/notification";
import { CallGetLicenseByAsset } from "components/wallet/dataStructsCall";
import { LicencesTable } from "../Table";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddLicenceModal from "./addLicenceModal";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const LicencesModal = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [licences, setLicences] = useState<Licence[]>();
  const [showAddLicenceModal, setShowAddLicenceModal] = useState(false);

  const [notify, setNotify] = useState<any>({isOpen:false, message:'', type:'info'})

  const handleAddLicence = () => {
      console.log("Añadir licencia")
      setShowAddLicenceModal(true);
  }

  useEffect(() => {

    CallGetLicenseByAsset(Number(props.assetId!)).then((response) => {
        console.log(response)
      const cont = response.length;
      const container: Licence[] = [];
      for (let i = 0; i < cont; i++) {
        console.log(response[i]);
        const licencia: Licence = {
          name: response[i].name,
          key: response[i].key,
          adquireDate: Number(response[i].adquireDate),
          expirationDate: Number(response[i].expirationDate),
          licenseType: (response[i].licenseType),
        };
        container.push(licencia);
      }
      setLicences(container)
      setIsLoading(false);
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
          {isLoading && <Skeleton></Skeleton>}
          {!isLoading && (
            <>
            <div className="flex flex-row justify-between content-evenly p-1 mb-3">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Licencias del activo
              </Typography>
              <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddLicence()}
            >
             <AddBoxIcon className="mr-2"/> Añadir Nueva 
            </Button>
            </div>
              {licences!.length === 0 && (
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Este activo aún no cuenta con licencias, puedes añadir una nueva desde el botón superior
                </Typography>
              )}
            {licences!.length !== 0 && (<LicencesTable
              {...licences!}
            />)}
            </>
          )}
          <div className="mb-6"></div>
        </Box>
      </Modal>
      <AddLicenceModal
            show={showAddLicenceModal!}
            close={() => setShowAddLicenceModal(false)}
            assetId={props.assetId}
            />
    </div>
  );
};
export default LicencesModal;