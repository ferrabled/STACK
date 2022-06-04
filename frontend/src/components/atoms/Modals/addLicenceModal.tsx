import { Button, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Notification from "components/notification";
import { CallInsertLicenseToSoft } from "components/wallet/dataStructsCall";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "types";
import * as Yup from "yup";


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

const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio").max(60),
    adquireDate: Yup.string()
      .required("La fecha de adquisición es obligatoria")
      .max(40),
  });

const AddLicenceModal = (props: any) => {
    const navigate = useNavigate();


  const [notify, setNotify] = useState<any>({isOpen:false, message:'', type:'info'})
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
          <Formik
            initialValues={{
                name: '',
                key: '',
                adquireDate: 0,
                adquireDateString: "",
                expirationDate: 0,
                expirationDateString: "",
                licenseType: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
                const dateString = data.adquireDateString; // Oct 23
                const dateParts: string[] = dateString.split("-");
                let dateObject = new Date(
                    +dateParts[0],
                    +dateParts[1] - 1,
                    +dateParts[2]
                );
                const offset = dateObject.getTimezoneOffset();
                dateObject = new Date(dateObject.getTime() - offset * 60 * 1000);
                data.adquireDate = dateObject.getTime();

                const dateString2 = data.expirationDateString; // Oct 23
                const dateParts2: string[] = dateString2.split("-");
                let dateObject2 = new Date(
                    +dateParts2[0],
                    +dateParts2[1] - 1,
                    +dateParts2[2]
                );
                dateObject2 = new Date(dateObject2.getTime() - offset * 60 * 1000);
                data.expirationDate = dateObject2.getTime();
                CallInsertLicenseToSoft(data, props.assetId).then((r)=> {
                  const notify:Notify = r!;
                  if (notify.type === 'success') {
                    setTimeout(function(){
                        navigate("/asset/");
                      }, 4000);
                  } 
                  setNotify(notify);
                });
                setSubmitting(true);
            }}
          >
            {({ values, isSubmitting, errors, handleChange }) => (
              <Form>
                <div className="mb-6">
                  <Typography variant="h5">Añadir Licencia</Typography>
                </div>

                <div className="mb-6">
                  <Field
                    name="name"
                    value={values.name}
                    label="Nombre"
                    inputProps={{ maxLength: 255 }}
                    fullWidth
                    required
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name : " "}
                    as={TextField}
                  />
                </div>
                <div className="mb-6">
                  <Field
                    name="key"
                    value={values.key}
                    label="Clave"
                    inputProps={{ maxLength: 255 }}
                    fullWidth
                    required
                    error={Boolean(errors.key)}
                    helperText={errors.key ? errors.key : " "}
                    as={TextField}
                  />
                </div>
                <div className="flex flex-row justify-center items-center gap-5">
                <div className="w-1/2">
                  <Field
                    id="adquireDateString"
                    label="Fecha de adquisición"
                    value={values.adquireDateString}
                    required
                    error={Boolean(errors.adquireDateString)}
                    type="date"
                    fullWidth
                    //sx={{ width: 300 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    as={TextField}
                  />
                  </div>
                  <div className="w-1/2">
                  <Field
                    id="expirationDateString"
                    label="Fecha de expiración"
                    value={values.expirationDateString}
                    required
                    error={Boolean(errors.expirationDateString)}
                    type="date"
                    fullWidth
                    //sx={{ width: 300 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    as={TextField}
                  />
                  </div>
                  </div>
                  <div className="my-5 flex flex-col items-center justify-center">
                    <InputLabel id="test-select-label">
                      Tipo de Licencia
                    </InputLabel>
                    <Field
                      name="licenseType"
                      className="px-2 my-2 w-1/2 mb-5"
                      variant="outlined"
                      onChange={handleChange}
                      required
                      error={Boolean(errors.licenseType)}
                      value={values.licenseType}
                      as={Select}
                    >
                      <MenuItem value={0}>Libre</MenuItem>
                      <MenuItem value={1}>Comercial</MenuItem>
                      <MenuItem value={2}>De prueba</MenuItem>
                    </Field>
                  </div>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Guardar Licencia
                </Button>
                
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};
export default AddLicenceModal;
