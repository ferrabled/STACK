import { Button, TextField, Typography } from "@mui/material";
import Notification from "components/notification";
import { CallInsertUser, WaitForInsertUser } from "components/wallet/userCall";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Notify, Users } from "types";
import * as Yup from "yup";

const UserForm = (props: any) => {

  const [notify, setNotify] = useState<any>({isOpen:false, message:'', type:'info'})
  useEffect(() =>  {
   
  }, [])


  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio").max(20),
    surname: Yup.string().required("El apellido es obligatorio").max(40),
    email: Yup.string()
      .email("Introduce un correo válido")
      .max(50)
      .required("El correo es obligatorio"),
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
        surname: "User",
        email: "fer@gmail.com",
        telephone: "634579874",
        orgId: props.props,
      }}
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting }) => {
        console.log(props.props);
        setSubmitting(true);
        console.log(data);
        try {
          CallInsertUser(data).then((response) => {
            console.log(response)
            const notify:Notify = response!; 
            setNotify(notify);
          });
        }catch (e){
          console.log(e);
        }
        WaitForInsertUser(data);
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
                name="name"
                value={values.name}
                label="Nombre del Administrador"
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
              Siguiente
            </Button>
          </>
        </Form>
      )}
    </Formik>
    <Notification {...notify}></Notification></div>
  );
};

export default UserForm;
