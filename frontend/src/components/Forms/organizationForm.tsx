import { Button, TextField, Typography } from "@mui/material";
import
  {
    CallInsertOrg,
    WaitForInsertOrg
  } from "components/wallet/contractCall";
import { Field, Form, Formik } from "formik";
import useToast from "hooks/useNotify";
import React, { useState } from "react";
import { OrganizationAndAdmin } from "types";
import * as Yup from "yup";

const OrganizationForm = () => {
  const [notification, setNotify] = useToast();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("El nombre es obligatorio").max(20),
    lastName: Yup.string().required("El apellido es obligatorio").max(40),
    email: Yup.string()
      .email("Introduce un correo válido")
      .max(50)
      .required("El correo es obligatorio"),
    telephoneAdmin: Yup.string()
      .matches(phoneRegExp, "Introduce un teléfono válido")
      .min(9, "Introduce un teléfono válido")
      .max(9, "Introduce un teléfono válido")
      .required("El teléfono del administrador es obligatorio"),
    organizationName: Yup.string()
      .required("El nombre de la organización es obligatorio")
      .max(20),
    address: Yup.string().required("La dirección es obligatoria").max(70),
    telephoneOrganization: Yup.string()
      .matches(phoneRegExp, "Introduce un teléfono válido")
      .min(9, "Introduce un teléfono válido")
      .max(9, "Introduce un teléfono válido")
      .required("El teléfono de la organización es obligatorio"),
  });

  const handleSubmit = async (input: OrganizationAndAdmin) => {
    console.log(input);
    console.log("Create Organization");
    await CallInsertOrg(input).then((n) => {
      setNotify(n);
    });
    WaitForInsertOrg(input);
  };

  const [formIndex, setFormIndex] = useState(0);

  return (
    <div className="flex flex-col m-6">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          telephoneAdmin: "",
          organizationName: "",
          address: "",
          telephoneOrganization: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          setFormIndex(formIndex + 1);
        }}
      >
        {({ values, errors }) => (
          <Form>
            {formIndex === 0 && (
              <>
                <div className="mb-6">
                  <Typography variant="h5">Datos del administrador</Typography>
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
                    name="lastName"
                    label="Apellidos del Administrador"
                    inputProps={{ maxLength: 255 }}
                    required
                    fullWidth
                    helperText={errors.lastName ? errors.lastName : " "}
                    error={Boolean(errors.lastName)}
                    as={TextField}
                  />
                </div>
                <div className="mb-6">
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
                <div className="mb-6">
                  <Field
                    name="telephoneAdmin"
                    label="Teléfono"
                    inputProps={{ maxLength: 255 }}
                    fullWidth
                    required
                    error={Boolean(errors.telephoneAdmin)}
                    helperText={
                      errors.telephoneAdmin ? errors.telephoneAdmin : " "
                    }
                    as={TextField}
                  />
                </div>
                <Button
                  fullWidth
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      values.firstName == "" ||
                      values.lastName == "" ||
                      values.email == "" ||
                      errors == undefined
                    ) {
                      alert("Comprueba todos los campos");
                    } else {
                      setFormIndex(formIndex + 1);
                    }
                  }}
                  variant="contained"
                  color="primary"
                >
                  Siguiente
                </Button>
              </>
            )}
            {formIndex === 1 && (
              <>
                <div className="mb-6">
                  <Typography variant="h5">Datos de la organización</Typography>
                </div>
                <div className="mb-6">
                  <Field
                    name="organizationName"
                    value={values.organizationName}
                    label="Nombre de la Organización"
                    inputProps={{ maxLength: 255 }}
                    fullWidth
                    required
                    error={Boolean(errors.organizationName)}
                    helperText={
                      errors.organizationName ? errors.organizationName : " "
                    }
                    as={TextField}
                  />
                </div>
                <div className="mb-6">
                  <Field
                    name="address"
                    label="Dirección de la Organización"
                    inputProps={{ maxLength: 255 }}
                    value={values.address}
                    required
                    fullWidth
                    helperText={errors.address ? errors.address : " "}
                    error={Boolean(errors.address)}
                    as={TextField}
                  />
                </div>
                <div className="mb-6">
                  <Field
                    name="telephoneOrganization"
                    label="Teléfono"
                    inputProps={{ maxLength: 255 }}
                    value={values.telephoneOrganization}
                    fullWidth
                    required
                    error={Boolean(errors.telephoneOrganization)}
                    helperText={
                      errors.telephoneOrganization
                        ? errors.telephoneOrganization
                        : " "
                    }
                    as={TextField}
                  />
                </div>
                <div className="lg:mx-56 xl:mx-64 2xl:mx-80 2xl:gap-40 flex flex-row gap-24 items-center justify-center childre">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormIndex(formIndex - 1);
                    }}
                  >
                    Atrás
                  </Button>

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Continuar
                  </Button>
                </div>
              </>
            )}
            {formIndex === 2 && (
              <>
                <div className="flex flex-col items-center">
                  <div className="mb-6">
                    <Typography variant="h5">Guardar datos</Typography>
                  </div>
                  <Typography>
                    Para finalizar debes conectar tu cartera Metamask, e
                    interactuar con la blockchain. De esta manera asociamos los
                    datos de tu organización a tu billetera y guardamos la
                    información de una manera segura en la Blockchain.
                  </Typography>
                  <img
                    className="h-44 w-44 my-5"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleSubmit(values)}
                  >
                    Finalizar
                  </Button>
                  <a
                    className="mt-5"
                    href="https://metamask.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Typography
                      sx={{ textDecoration: "underline" }}
                      variant="body2"
                    >
                      No sé como conectar Metamask
                    </Typography>
                  </a>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
      {notification}
    </div>
  );
};

export default OrganizationForm;
