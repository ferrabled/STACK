import { Button, TextField, Typography } from "@mui/material";
import { CallInsertDepartment } from "components/wallet/userCall";
import { Field, Form, Formik } from "formik";
import { Notify } from "types";
import * as Yup from "yup";
import useToast from "hooks/useNotify";
const DepartmentForm = () => {
  const [toast, setNotify] = useToast();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio").max(20),
    description: Yup.string().required("La descripción es obligatoria").max(40),
    telephone: Yup.string()
      .matches(phoneRegExp, "Introduce un teléfono válido")
      .min(9, "Introduce un teléfono válido")
      .max(9, "Introduce un teléfono válido"),
  });

  return (
    <div className="flex flex-col m-6">
      <Formik
        initialValues={{
          name: "Fernando",
          description: "User",
          telephone: "634579874",
          orgId: window.localStorage.getItem("orgId"),
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          console.log(data);
          try {
            CallInsertDepartment(data).then((response) => {
              /* console.log(response) */
              const notify: Notify = response!;
              setNotify(notify);
              setSubmitting(true);
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {({ values, errors }) => (
          <Form>
            <>
              <div className="mb-6">
                <Typography variant="h5">Datos del Departamento</Typography>
              </div>
              <div className="mb-6">
                <Field
                  name="name"
                  value={values.name}
                  label="Nombre del Departamento"
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
                  name="description"
                  label="Descripción"
                  inputProps={{ maxLength: 255 }}
                  required
                  fullWidth
                  helperText={errors.description ? errors.description : " "}
                  error={Boolean(errors.description)}
                  as={TextField}
                />
              </div>
              <div className="mb-6">
                <Field
                  name="telephone"
                  label="Teléfono"
                  inputProps={{ maxLength: 255 }}
                  fullWidth
                  error={Boolean(errors.telephone)}
                  helperText={errors.telephone ? errors.telephone : " "}
                  as={TextField}
                />
              </div>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Añadir Departamento
              </Button>
            </>
          </Form>
        )}
      </Formik>
      {toast}
    </div>
  );
};

export default DepartmentForm;
