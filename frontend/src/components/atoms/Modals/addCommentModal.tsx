import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CallInsertComment } from "components/wallet/userCall";
import { Field, Form, Formik } from "formik";
import useToast from "hooks/useNotify";
import * as Yup from "yup";

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

const validationSchema = Yup.object({
  description: Yup.string().required("La descripción es obligatoria").max(60),
});

const AddCommentModal = (props: {
  show: boolean;
  close: () => void;
  assetId: number;
}) => {
  const [toast, setToast] = useToast();

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
          <Formik
            initialValues={{
              description: "",
              userId: 0,
              date: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              const orgId = window.localStorage.getItem("orgId");
              data.date = Date.now();
              console.log(data);
              CallInsertComment(data, props.assetId, Number(orgId)).then(
                (n) => {
                  setToast(n);
                }
              );
              setSubmitting(true);
            }}
          >
            {({ values, errors }) => (
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
