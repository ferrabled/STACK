import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const UserForm = (orgId:number) => {

    const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = Yup.object({
        firstName: Yup.string().required("El nombre es obligatorio").max(20),
        surname: Yup.string().required("El apellido es obligatorio").max(40),
        email: Yup.string()
          .email("Introduce un correo válido")
          .max(50)
          .required("El correo es obligatorio"),
        telephoneA: Yup.string()
          .matches(phoneRegExp, "Introduce un teléfono válido")
          .min(9, "Introduce un teléfono válido")
          .max(9, "Introduce un teléfono válido"),
        
      });


    return (
        <Formik
        initialValues={{
          firstName: "",
          surname: "",
          email: "",
          telephone: "",
          orgId: orgId
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          //make async call
        }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form>
              <>
                <div className="mb-6">
                  <Typography variant="h5">Datos del Usuario</Typography>
                </div>
                <div className="mb-6">
                  <Field
                    name="firstName"
                    value={values.firstName}
                    label="Nombre del Administrador"
                    inputProps={{ maxLength: 255 }}
                    fullWidth
                    required
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName ? errors.firstName : " "}
                    as={TextField}
                  />
                </div>
                <div className="mb-6">
                  <Field
                    name="surname"
                    label="Apellidos del Administrador"
                    inputProps={{ maxLength: 255 }}
                    required
                    fullWidth
                    helperText={errors.surname ? errors.surname : " "}
                    error={Boolean(errors.surname)}
                    as={TextField}
                  />
                </div>
                <div className="mb-5 lg:flex flex-row items-center">
                  <div className="lg:w-1/2 min-w-1/2">
                    <Field
                      name="email"
                      label="Correo Electrónico"
                      inputProps={{ maxLength: 255 }}
                      required
                      fullWidth
                      helperText={errors.email ? errors.email : " "}
                      error={Boolean(errors.email)}
                      as={TextField}
                    />
                  </div>
                 {/*  <div className="flex flex-row items-center mt-3 lg:pl-6 lg:mt-0 ">
                    <Field type="checkbox" name="isEmail" as={Checkbox} />
                    <Typography variant="body2">
                      Deseo recibir actualizaciones sobre los activos de mi
                      organización
                    </Typography>
                  </div> */}
                </div>
                <div className="mb-6">
                  <Field
                    name="telephoneA"
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
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      values.firstName == "" ||
                      values.surname == "" ||
                      values.email == "" ||
                      errors == undefined
                    ) {
                      alert("Comprueba todos los campos");
                    } else {
                      //setFormIndex(formIndex + 1);
                    }
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Siguiente
                </Button>
              </>
          </Form>
        )}
        </Formik>
    )
}

export default UserForm;