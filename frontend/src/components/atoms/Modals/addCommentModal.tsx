import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { CallInsertComment } from "components/wallet/userCall";
import { Notify } from "types";
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

const validationSchema = Yup.object({
    description: Yup.string().required("La descripción es obligatoria").max(60),
  });

const AddCommentModal = (props: any) => {

  const [notify, setNotify] = useState<any>({isOpen:false, message:'', type:'info'})

  useEffect(() => {}, []);

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
                description: '',
                userId: 0,
                date: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
                const orgId = window.localStorage.getItem("orgId")!;
                data.date = Date.now();
                console.log(data);
                CallInsertComment(data, props.assetId, Number(orgId)).then((r)=> {
                  const notify:Notify = r!; 
                  setNotify(notify);
                });
                setSubmitting(true);
            }}
          >
            {({ values, isSubmitting, errors, handleChange }) => (
              <Form>
                <div className="mb-6">
                  <Typography variant="h5">Añadir Comentario</Typography>
                </div>

                <div className="mb-6">
                  <Field
                    name="description"
                    value={values.description}
                    label="Descripción"
                    inputProps={{ maxLength: 255 }}
                    fullWidth
                    required
                    error={Boolean(errors.description)}
                    helperText={errors.description ? errors.description : " "}
                    as={TextField}
                  />
                </div>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Guardar Comentario
                </Button>
                
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};
export default AddCommentModal;
