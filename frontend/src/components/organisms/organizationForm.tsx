import React, { useEffect, useState } from "react";
import { TextField, Button, Checkbox, Typography } from "@mui/material";
import { AdminFormValues } from "types";

export interface EventFormProps {
  initialValues?: Partial<AdminFormValues>;
  onSubmit: (values: AdminFormValues) => void;
}

//formik
// const OrganizationSchema = yup.schema({
//   name: Yup.string(),
//   telephone: Yup.number().minLength(20)
// });

const OrganizationForm = (props: EventFormProps) => {
  const { initialValues, onSubmit } = props;
  const required = [{ required: true, message: "Campo Obligatorio" }];

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [telephone, setTelephone] = useState("");

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [checkEmailError, setCheckEmailError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);

  const [formIndex, setFormIndex] = useState(0);

const validate = () => {
  setNameError(false);
  setSurnameError(false);
  setEmailError(false);
  setTelephoneError(false);
  setCheckEmailError(false);

  if (name == "") {
    setNameError(true);
  }
  if (surname == "") {
    setSurnameError(true);
  }
  if (email == "") {
    setEmailError(true);
  }
  let reg = new RegExp(/^\d*$/).test(telephone);
  if (!reg && telephone != "") {
    setTelephoneError(true);
  }
  if (name && surname && email) {
    console.log(name, email, telephone);
    const Org2: AdminFormValues = {
      name: name,
      surname: surname,
      email: email,
      checkemail: checkEmail,
      telephone: parseInt(telephone),
    };
    return Org2;
  }
}

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validate();
    const finalObject = {
      name,
      surname,
      address,
      telephone
    };
  };

  //FORM 2
  const [nameOrg, setNameOrg] = useState('')
  const [address, setAddress] = useState('')
  const [telephoneO, setTelephoneO] = useState('')

  const [nameOrgError, setNameOrgError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [telephoneOError, setTelephoneOError] = useState(false)

  const hasAnErrorInFormOne = nameError || surnameError || emailError || checkEmailError || telephoneError;
  const hasAnErrorInFormTwo = nameOrgError || addressError || telephoneOError;

  // Para el form 1
  useEffect(() => {
    validate();
  }, [name, surname, email, checkEmail, telephone]);
  
  // const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   setNameError(false);
  //   setAddressError(false);
  //   setTelephoneError(false);

  //   if (name == '') {
  //     setNameError(true)
  //   }
  //   if (address == '') {
  //     setAddressError(true)
  //   }
  //   let reg = new RegExp(/^\d*$/).test(telephone);
  //   if (!reg && telephone != '') {
  //     setTelephoneError(true)
  //   }
  //   if (name && address) {
  //     console.log(name, address, telephone)
  //     const Org2: OrganizationFormValues = {
  //       nameO: name,
  //       address: address,
  //       telephoneO: parseInt(telephone)
  //     }
//}

  return (
    <div className="flex flex-col m-12">
      <form noValidate onSubmit={handleSubmit}>
        {formIndex === 0 && (
          <>
            <div className="mb-5">
              <TextField
                autoComplete="off"
                label="Nombre del Administrador"
                inputProps={{ maxLength: 255 }}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                error={nameError}
                /* helperText={"Introduce un nombre de la organización"} */
                variant="outlined"
              />
            </div>
 
            <div className="mb-5">
              <TextField
                autoComplete="off"
                label="Apellido del Administrador"
                inputProps={{ maxLength: 255 }}
                onChange={(e) => setSurname(e.target.value)}
                required
                fullWidth
                error={surnameError}
                /* helperText={"Introduce un nombre de la organización"} */
                variant="outlined"
              />
            </div>

            <div className="mb-5 lg:flex flex-row items-center">
              <div className="lg:w-1/2 min-w-1/2">
                <TextField
                  id="email"
                  autoComplete="off"
                  label="Correo Electrónico"
                  inputProps={{ maxLength: 255 }}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  error={emailError}
                  /* helperText={"Introduce una dirección de la organización"} */
                  variant="outlined"
                />
              </div>
              <div className="flex flex-row items-center mt-3 lg:pl-6 lg:mt-0 ">
                <Checkbox onChange={(e) => setCheckEmail(e.target.checked)} />
                <Typography variant="body2">
                  Deseo recibir actualizaciones sobre los activos de mi
                  organización
                </Typography>
              </div>
            </div>

            <div className="mb-5">
              <TextField
                id="telephoneO"
                autoComplete="off"
                label="Número de Teléfono"
                fullWidth
                inputProps={{ maxLength: 255 }}
                onChange={(e) => setTelephone(e.target.value)}
                error={telephoneError}
                /* helperText={"Solo se permiten números"} */
                variant="outlined"
              />
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault();
                if (hasAnErrorInFormOne)
                  alert("Cuidado tienes errors")
                else 
                  setFormIndex(formIndex + 1);
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
            <div className="mb-5">
              <TextField
                id="outlined-basic"
                autoComplete="off"
                label="Nombre de la Organización"
                inputProps={{ maxLength: 255 }}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                error={nameError}
                /* helperText={"Introduce un nombre de la organización"} */
                variant="outlined"
              />
            </div>

            <div className="mb-5">
              <TextField
                className="py-9"
                id="address"
                autoComplete="off"
                label="Dirección"
                inputProps={{ maxLength: 255 }}
                onChange={(e) => setAddress(e.target.value)}
                required
                fullWidth
                error={addressError}
                /* helperText={"Introduce una dirección de la organización"} */
                variant="outlined"
              />
            </div>

            <div className="mb-5">
              <TextField
                id="telephoneO"
                autoComplete="off"
                label="Número de Teléfono"
                fullWidth
                inputProps={{ maxLength: 255 }}
                onChange={(e) => setTelephone(e.target.value)}
                error={telephoneError}
                /* helperText={"Solo se permiten números"} */
                variant="outlined"
              />
            </div>

            <Button type="submit" variant="contained" color="primary">
              GUARDAR
            </Button>
            <p>Segunda pagina</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setFormIndex(formIndex - 1);
              }}
            >
              atras
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default OrganizationForm;
