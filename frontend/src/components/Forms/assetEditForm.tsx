import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import DateAdapter from "@mui/lab/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { date } from "yup/lib/locale";
import  { CallGetAsset, CallInsertAsset, CallInsertEditedAsset } from "components/wallet/contractCall";
import {formatDate, formatDateyMd} from "utils";
import { Asset, AssetEdited, Department } from "types";
import { useNavigate } from "react-router-dom";
import { CallGetAllDepartmentsFromOrg } from "components/wallet/userCall";
import { Notify } from "types";
import Notification from "components/notification";


const EditAssetForm = (props: {data: AssetEdited}) => {
  const [notify, setNotify] = useState<any>({isOpen:false, message:'', type:'info'})
  const navigate = useNavigate(); 
  const [departments, setDepartments] = useState<Department[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [assetDepart, setAssetDepart] = useState<Number>();
  const [assetEd, setAssetEd] = useState<AssetEdited>();
  const [fAdquireDate, setFAdqDate] = useState("");


  useEffect(()=> {
    console.log(props);
    setAssetEd(props.data);
    const dateTime = (props.data.adquireDate!)
    const date = formatDateyMd(dateTime);
    console.log(date);
    setFAdqDate(date);

    CallGetAllDepartmentsFromOrg(Number(window.localStorage.getItem('orgId')!)).then(r=> {
      console.log(r);
      const cont = r.length;
      let container: Department[] = [];
      for (var i = 0; i < cont; i++) {
          const department: Department = {
            name: r[i].name,
            description: r[i].description,
            telephone: Number(r[i].telephone),
            orgId: Number(r[i].orgId),
            id: Number(r[i].index),
            index: Number(r[i].index)
          }
      container.push(department);
      
      
      }
      CallGetAsset(props.data.originalAssetId).then((res)=> {
        setAssetDepart(Number(res.assetDepart));
        setIsLoading(false);

      })
      setDepartments(container);
    })
  },[])
  
  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio").max(100),
    adquireDate: Yup.string()
      .required("La fecha de adquisición es obligatoria")
      .max(40),
    assetType: Yup.string()
      .required("La fecha de adquisición es obligatoria")
      .max(40),
  });

  const ConnectToContract = (data: any) => {
    CallInsertEditedAsset(data).then((r)=> {
      const notify:Notify = r!; 
      setNotify(notify);
    });
  }

  if (isLoading) return <></>
  else return (
    <div className="flex flex-col m-6">
    <Notification {...notify}></Notification>
    <Formik
        initialValues={{
          name: assetEd!.name,
          organizationId: Number(window.localStorage.getItem('orgId')!),
          adquireDateString: fAdquireDate,
          adquireDate: assetEd!.adquireDate!.getTime(),
          creationDate: 0,
          assetType: assetEd!.assetType,
          originalAssetId: assetEd!.originalAssetId,
          department:assetDepart,

        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          var dateString = data.adquireDateString; 
          var dateParts: Array<String> = dateString.split("-");
          var dateObject = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]); 
          const offset = dateObject.getTimezoneOffset();
          dateObject = new Date(dateObject.getTime() - (offset*60*1000));
          data.adquireDate = dateObject.getTime();
          data.creationDate = Date.now();
          setSubmitting(true);
          ConnectToContract(data);
        }}
      >
        {({ values, isSubmitting, errors, handleChange }) => (
          
            <Form>
              <>
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
                      disabled
                      /* error={Boolean(errors.assetType)}  */
                      value={values.department}
                      as={Select}
                    >
                      <MenuItem value={0}>Sin departamento</MenuItem>
                      {!isLoading && (departments!.map(department => (
                          <MenuItem
                            key={Number(department.index)}
                            value={Number(department.index)}
                          >
                            {department.name}
                          </MenuItem>)))}
                  
                    </Field>
                  </div>
                </div>
                <div className="mb-9">
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
                      disabled
                      error={Boolean(errors.assetType)}
                      value={values.assetType}
                      as={Select}
                    >
                      <MenuItem value={0}>Software</MenuItem>
                      <MenuItem value={1}>Hardware</MenuItem>
                      <MenuItem value={2}>Documento</MenuItem>
                      <MenuItem value={3}>Datos</MenuItem>
                      <MenuItem value={4}>Red</MenuItem>
                      <MenuItem value={5}>Nube</MenuItem>
                      <MenuItem value={6}>No determinado</MenuItem>
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
  );
};

export default EditAssetForm;
