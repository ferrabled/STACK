import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";

import DateAdapter from "@mui/lab/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { date } from "yup/lib/locale";
import  { CallInsertAsset, CallInsertEditedAsset } from "components/wallet/contractCall";
import {formatDate, formatDateyMd} from "utils";

type AssetEdited = {
  name: string;
  adquireDate?: Date;
  creationDate?: Date;
  assetType?: string;
  originalAssetId:number;
};



const EditAssetForm = (props: {data: AssetEdited}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [assetEd, setAssetEd] = useState<AssetEdited>();
  const [fAdquireDate, setFAdqDate] = useState("");


  useEffect(()=> {
    console.log(props);
    setAssetEd(props.data);
    const date = formatDateyMd(props.data.adquireDate!);
    console.log(date);
    setFAdqDate(date);
    setIsLoading(false);
  },[])
  
  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio").max(20),
    adquireDate: Yup.string()
      .required("La fecha de adquisición es obligatoria")
      .max(40),
    assetType: Yup.string()
      .required("La fecha de adquisición es obligatoria")
      .max(40),
  });

  const ConnectToContract = (data: any) => {
    CallInsertEditedAsset(data);
  }

  if (isLoading) return <></>
  else return (
    <div>
      <Formik
        initialValues={{
          name: assetEd!.name,
          //TODO ORG ID
          organizationId: 0,
          adquireDateString: fAdquireDate,
          adquireDate: assetEd!.adquireDate!.getTime(),
          creationDate: assetEd!.creationDate!.getTime(),
          assetType: assetEd!.assetType,
          originalAssetId: assetEd!.originalAssetId
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {

                        
            var dateString = data.adquireDateString; // Oct 23
            var dateParts: Array<String> = dateString.split("-");
            // month is 0-based, that's why we need dataParts[1] - 1
            var dateObject = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]); 
            data.adquireDate = dateObject.getTime();

            const offset = dateObject.getTimezoneOffset();
            dateObject = new Date(dateObject.getTime() - (offset*60*1000));

            setSubmitting(true);
            console.log(data);
            console.log("Enviar")
            ConnectToContract(data);
        }}
      >
        {({ values, isSubmitting, errors, handleChange }) => (
          <Form>
            <div className="mb-6">
              <Typography variant="h5">Editar activo</Typography>
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
            <div className="mb-6">
                <Field
                  id="adquireDateString"
                  label="Birthday"
                  value={values.adquireDateString}
                  type="date"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  as={TextField}
                />
               </div>
            <div className="mb-5 lg:flex flex-row items-center">
              <div className="lg:w-1/2 min-w-1/2">
                <Field
                  name="assetType"
                  label="Tipo"
                  inputProps={{ maxLength: 255 }}
                  required
                  fullWidth
                  helperText={errors.assetType ? errors.assetType : " "}
                  error={Boolean(errors.assetType)}
                  as={TextField}
                />
              </div>
            </div>

            <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Continuar
                  </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditAssetForm;
