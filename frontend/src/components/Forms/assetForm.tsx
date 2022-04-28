import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { SoftwareForm, HardwareForm, DocumentForm, DataForm, NetworkForm, OtherForm, SubmitAsset } from "./formTypes";

import DateAdapter from "@mui/lab/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { date } from "yup/lib/locale";
import { CallInsertAsset } from "components/wallet/contractCall";
import { Asset } from "types";
import { useNavigate } from "react-router-dom";


const AssetForm = () => {
  const navigate = useNavigate(); 

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio").max(100),
    adquireDate: Yup.string()
      .required("La fecha de adquisición es obligatoria")
      .max(40),
    assetType: Yup.string()
      .required("El tipo de activo es obligatorio")
      .max(40),
  });

  const ConnectToContract = (data: any) => {
    CallInsertAsset(data);
  };


  const [asset, setAsset] = useState<Asset>()

  //TODO CHANGE ORG ID
  const [formIndex, setFormIndex] = useState(0);

  return (
    <div className="flex flex-col m-6">
      {formIndex === 0 && (
        <div>
      <Formik
        initialValues={{
          //TODO change initial values
          name: "Nombre",
          organizationId: 0,
          adquireDateString: "1999-10-11",
          adquireDate: 10,
          creationDate: 100,
          assetType: "1",
          department:"0",

        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          var now = new Date();
          var timeOffset = now.getTimezoneOffset();

          data.creationDate = Date.now();
          //let diff = data.creationDate.getTimezoneOffset();
          //console.log(data.creationDate.toUTCString())

          //TODO GUARDAR WITH TIMEZONE DIFFERENCE OR WITHOUT

          var dateString = data.adquireDateString; // Oct 23
          var dateParts: Array<String> = dateString.split("-");
          // month is 0-based, that's why we need dataParts[1] - 1
          var dateObject = new Date(
            +dateParts[0],
            +dateParts[1] - 1,
            +dateParts[2]
          );
          console.log(dateObject.getTime());
          data.adquireDate = dateObject.getTime();

          const offset = dateObject.getTimezoneOffset();
          dateObject = new Date(dateObject.getTime() - offset * 60 * 1000);

          //data.creationDate = dateObject;
          //var dateAgain = dateObject.toISOString().split('T')[0];
          //console.log(dateAgain);
          setSubmitting(true);
          console.log(data);
          console.log("Enviar");
          const asset: Asset = {
            name: data.name,
            orgId: data.organizationId,
            assetType: Number(data.assetType),
            creationDate: data.creationDate,
            adquireDate: data.adquireDate,
          }
          setAsset(asset)
          setFormIndex(formIndex + 1);
          //ConnectToContract(data);
        }}
      >
        {({ values, isSubmitting, errors, handleChange }) => (
          
            <Form>
              <>
                <div className="mb-6">
                  <Typography variant="h5">Datos del nuevo activo</Typography>
                </div>
                <div className="mb-6">
                  <Field
                    name="name"
                    value={values.name}
                    label="Nombre del Activo"
                    inputProps={{ maxLength: 255 }}
                    fullWidth
                    required
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name : " "}
                    as={TextField}
                  />
                </div>
                <div className="mb-6 flex flex-row items-center justify-center gap-12">
                  <div className="mt-3 w-1/2">
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
                  <InputLabel id="department-label" className="-mt-3">
                      Departamento
                    </InputLabel>
                  <Field
                      name="department"
                      className="px-2 my-2 w-1/2"
                      variant="outlined"
                      onChange={handleChange}
                      required
                      fullWidth
                      /* error={Boolean(errors.assetType)}  */
                      value={values.department}
                      as={Select}
                    >
                      <MenuItem value={0}>Sin departamento</MenuItem>
                  
                    </Field>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="">
                    <InputLabel id="test-select-label">
                      Tipo de activo
                    </InputLabel>
                    <Field
                      name="assetType"
                      className="px-2 my-2 w-1/2"
                      variant="outlined"
                      onChange={handleChange}
                      required
                      error={Boolean(errors.assetType)}
                      value={values.assetType}
                      as={Select}
                    >
                      <MenuItem value={0}>Software</MenuItem>
                      <MenuItem value={1}>Hardware</MenuItem>
                      <MenuItem value={2}>Documento</MenuItem>
                      <MenuItem value={3}>Datos</MenuItem>
                      <MenuItem value={4}>Nube</MenuItem>
                      <MenuItem value={5}>No determinado</MenuItem>
                    </Field>
                  </div>
                </div>
                <div className="lg:mx-56 xl:mx-64 2xl:mx-80 2xl:gap-40 flex flex-row gap-24 items-center justify-center">
                <Button fullWidth
                  onClick={()=> {navigate("/assets")}}
                  variant="contained"
                  color="primary"> Cancelar </Button>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Continuar
                </Button></div>
              </>
          </Form>  
          )}     
      </Formik>
      </div>
      )}
      {formIndex === 1 && (
              <>
              {asset!.assetType === 0 && (<SoftwareForm/>)}
              {asset!.assetType === 1 && (<HardwareForm/>)}
              {asset!.assetType === 2 && (<DocumentForm/>)}
              {asset!.assetType === 3 && (<DataForm/>)}
              {asset!.assetType === 4 && (<NetworkForm/>)}
              {asset!.assetType === 5 && (<OtherForm/>)}
              <div className="lg:mx-56 xl:mx-64 2xl:mx-80 2xl:gap-40 flex flex-row gap-24 items-center justify-center">
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
                <SubmitAsset></SubmitAsset>
            </div>
            </>
        )}
  </div>
  );
};

export default AssetForm;
