import React, {useState} from "react";
import { TextField, Button } from '@mui/material';
import { OrganizationFormValues } from "types";
import { Navigate } from "react-router-dom";

export interface EventFormProps {
  initialValues?: Partial<OrganizationFormValues>;
  onSubmit: (values: OrganizationFormValues) => void;
}

const OrganizationForm2 = (props: EventFormProps) => {
  
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [telephone, setTelephone] = useState('')

  const [nameError, setNameError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [telephoneError, setTelephoneError] = useState(false)

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setNameError(false);
    setAddressError(false);
    setTelephoneError(false);

    if (name == '') {
      setNameError(true)
    }
    if (address == '') {
      setAddressError(true)
    }
    let reg = new RegExp(/^\d*$/).test(telephone);
    if (!reg && telephone != '') {
      setTelephoneError(true)
    }
    if (name && address) {
      console.log(name, address, telephone)
      const Org2: OrganizationFormValues = {
        nameO: name,
        address: address,
        telephoneO: parseInt(telephone)
      }
      
      /* .then(() => {
        navigate("/events");
      }) */
      return Org2
    } 
  }
  
  return (
    <div className="flex flex-col m-12">
      <form noValidate onSubmit={handleSubmit}>

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
      /></div>

<div className="mb-5">
    <TextField className="py-9"
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
      /></div>

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
      </form>
    </div>
  );
};

export default OrganizationForm2;