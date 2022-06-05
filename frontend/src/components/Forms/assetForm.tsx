import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CallGetAllDepartmentsFromOrg } from "components/wallet/userCall";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Asset,
  CloudAsset,
  DataAsset,
  Department,
  DocAsset,
  HardwareAsset,
  NetworkAsset,
  OtherAsset,
  SoftwareAsset,
} from "types";
import * as Yup from "yup";
import {
  CloudForm,
  DataForm,
  DocumentForm,
  HardwareForm,
  NetworkForm,
  OtherForm,
  SoftwareForm,
  SubmitAsset,
} from "./formTypes";

const AssetForm = () => {
  const [departments, setDepartments] = useState<Department[]>();
  const [isLoading, setIsLoading] = useState(true);

  const orgId = Number(window.localStorage.getItem("orgId"));
  useEffect(() => {
    CallGetAllDepartmentsFromOrg(orgId).then((r) => {
      const cont = r.length;
      const container: Department[] = [];
      for (let i = 0; i < cont; i++) {
        const department: Department = {
          name: r[i].name,
          description: r[i].description,
          telephone: r[i].telephone,
          orgId: Number(r[i].orgId),
          id: Number(r[i].index),
          index: Number(r[i].index),
        };
        container.push(department);
      }
      setDepartments(container);
      setIsLoading(false);
    });
  }, []);

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

  const [asset, setAsset] = useState<Asset>();
  const [formIndex, setFormIndex] = useState(0);

  return (
    <div className="flex flex-col m-6">
      {formIndex === 0 && (
        <div>
          <Formik
            initialValues={{
              //TODO change initial values
              name: "Nombre",
              organizationId: orgId,
              adquireDateString: "1999-10-11",
              adquireDate: 10,
              creationDate: 100,
              assetType: "1",
              department: "0",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              data.creationDate = Date.now();
              const dateString = data.adquireDateString; // Oct 23
              const dateParts: Array<string> = dateString.split("-");
              let dateObject = new Date(
                +dateParts[0],
                +dateParts[1] - 1,
                +dateParts[2]
              );
              const offset = dateObject.getTimezoneOffset();
              dateObject = new Date(dateObject.getTime() - offset * 60 * 1000);
              data.adquireDate = dateObject.getTime();
              const asset: Asset = {
                name: data.name,
                organizationId: data.organizationId,
                assetType: Number(data.assetType),
                assetDepart: Number(data.department),
                creationDate: data.creationDate,
                adquireDate: data.adquireDate,
              };
              setAsset(asset);
              setFormIndex(formIndex + 1);
              setSubmitting(true);
            }}
          >
            {({ values, errors, handleChange }) => (
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
                        {!isLoading &&
                          departments &&
                          departments.map((department) => (
                            <MenuItem
                              key={Number(department.index)}
                              value={Number(department.index)}
                            >
                              {department.name}
                            </MenuItem>
                          ))}
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
                    <Button
                      fullWidth
                      onClick={() => {
                        navigate("/assets");
                      }}
                      variant="contained"
                      color="primary"
                    >
                      {" "}
                      Cancelar{" "}
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
              </Form>
            )}
          </Formik>
        </div>
      )}
      {formIndex === 1 && asset && (
        <>
          {asset.assetType === 0 && (
            <SoftwareForm asset={asset as SoftwareAsset} edit={false} />
          )}
          {asset.assetType === 1 && (
            <HardwareForm asset={asset as HardwareAsset} edit={false} />
          )}
          {asset.assetType === 2 && (
            <DocumentForm asset={asset as DocAsset} edit={false} />
          )}
          {asset.assetType === 3 && (
            <DataForm asset={asset as DataAsset} edit={false} />
          )}
          {asset.assetType === 4 && (
            <NetworkForm asset={asset as NetworkAsset} edit={false} />
          )}
          {asset.assetType === 5 && (
            <CloudForm asset={asset as CloudAsset} edit={false} />
          )}
          {asset.assetType === 6 && (
            <OtherForm asset={asset as OtherAsset} edit={false} />
          )}
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
            <SubmitAsset />
          </div>
        </>
      )}
    </div>
  );
};

export default AssetForm;
