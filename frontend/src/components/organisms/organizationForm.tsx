import React, { useEffect, useState } from "react";
import { TextField, Button, Checkbox, Typography } from "@mui/material";
import { AdminFormValues } from "types";
import { Field, FieldAttributes, Form, Formik } from "formik";
import * as Yup from "yup";
import ButtonSOrganization from "components/atoms/Buttons/submitOrgButton";


//formik
// const OrganizationSchema = yup.schema({
//   name: Yup.string(),
//   telephone: Yup.number().minLength(20)
// });

const OrganizationForm = () => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("El nombre es obligatorio").max(20),
    lastName: Yup.string().required("El apellido es obligatorio").max(40),
    email: Yup.string()
      .email("Introduce un correo válido")
      .max(50)
      .required("El correo es obligatorio"),
    telephoneA: Yup.string()
      .matches(phoneRegExp, "Introduce un teléfono válido")
      .min(9, "Introduce un teléfono válido")
      .max(9, "Introduce un teléfono válido"),
    orgName: Yup.string().required("El nombre de la organización es obligatorio").max(20),
    address: Yup.string().required("La dirección es obligatoria").max(70),
    telephoneOrg: Yup.string()
      .matches(phoneRegExp, "Introduce un teléfono válido")
      .min(9, "Introduce un teléfono válido")
      .max(9, "Introduce un teléfono válido"),
  });

  /* const CreateTextField: React.FC<FieldAttributes<{}>> = (
    placeholder, ...props
  )} => {
    const [field, meta]
  } */
  const [formIndex, setFormIndex] = useState(0);

  return (
    <div className="flex flex-col m-6">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          isEmail: false,
          telephoneA: undefined,
          orgName: "",
          address: "",
          telephoneOrg: undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          //make async call
          setFormIndex(formIndex + 1)
        }}
      >
        {({ values, isSubmitting, errors }) => (
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
                  <div className="flex flex-row items-center mt-3 lg:pl-6 lg:mt-0 ">
                    <Field type="checkbox" name="isEmail" as={Checkbox} />
                    <Typography variant="body2">
                      Deseo recibir actualizaciones sobre los activos de mi
                      organización
                    </Typography>
                  </div>
                </div>
                <div className="mb-6">
                  <Field
                    name="telephoneA"
                    label="Teléfono"
                    inputProps={{ maxLength: 255 }}
                    fullWidth
                    error={Boolean(errors.telephoneA)}
                    helperText={errors.telephoneA ? errors.telephoneA : " "}
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
                    name="orgName"
                    value={values.orgName}
                    label="Nombre de la Organización"
                    inputProps={{ maxLength: 255 }}
                    fullWidth
                    required
                    error={Boolean(errors.orgName)}
                    helperText={errors.orgName ? errors.orgName : " "}
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
                    name="telephoneOrg"
                    label="Teléfono"
                    inputProps={{ maxLength: 255 }}
                    value={values.telephoneOrg}
                    fullWidth
                    error={Boolean(errors.telephoneOrg)}
                    helperText={errors.telephoneOrg ? errors.telephoneOrg : " "}
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
                    Para finalizar debes conectar tu cartera Metamask, e interactuar con la blockchain.
                    De esta manera asociamos los datos de tu organización a tu billetera
                    y guardamos la información de una manera segura en la
                    Blockchain.
                  </Typography>
                  <img
                    className="h-44 w-44 my-5"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                  />
                  
                  <ButtonSOrganization data={values}></ButtonSOrganization>
                  <a
                    className="mt-5"
                    href="https://metamask.io/"
                    target="_blank"
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
    </div>
  );
};

export default OrganizationForm;
