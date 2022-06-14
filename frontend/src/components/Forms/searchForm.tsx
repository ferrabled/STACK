/* eslint-disable @typescript-eslint/no-non-null-assertion */
import
  {
    Button,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    TextField,
    Typography
  } from "@mui/material";
import SimpleAssetsTable from "components/atoms/Table/simpleAssetsTable";
import
  {
    CallGetAsset,
    CallGetOrganizationAssets
  } from "components/wallet/contractCall";
import
  {
    CallGetAllDepartmentsFromOrg,
    CallGetNumberOfCommentsByAsset
  } from "components/wallet/userCall";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { AssetsInList, AssetTypes, Department, SearchObject } from "types";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().max(60),
  adquireDate: Yup.string().max(40),
});

export default function SearchForm() {
  const [departments, setDepartments] = useState<Department[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  const [formIndex, setFormIndex] = useState(0);
  const [assets, setAssets] = useState<AssetsInList[]>([]);

  const searchCondition = (searchObject: SearchObject, asset: AssetsInList) => {
    const keyList = Object.keys(searchObject);
    console.log(keyList);
    for (let i = 0; i < keyList.length; i++) {
      switch (keyList[i]) {
        case "name":
          if (
            !asset.name.toLowerCase().includes(searchObject.name!.toLowerCase())
          ) {
            console.log("Este asset no tiene ese nombre");
            return false;
          }
          break;
        case "adquireDateI":
          console.log(asset.adquireDate);
          console.log(searchObject.adquireDateI);
          if (asset.adquireDate <= searchObject.adquireDateI!) {
            console.log("Adquire date anterior");
            return false;
          }
          break;
        case "adquireDateF":
          if (asset.adquireDate >= searchObject.adquireDateF!) {
            console.log("Adquire date posterior");
            return false;
          }
          break;
        case "creationDateI":
          if (asset.creationDate <= searchObject.creationDateI!) {
            console.log("Creation date anterior");
            return false;
          }
          break;
        case "creationDateF":
          if (asset.creationDate >= searchObject.creationDateF!) {
            console.log("Creation date posterior");
            return false;
          }
          break;
        case "assetType":
          if (asset.assetType !== searchObject.assetType) {
            console.log("tipo de asset distinto");
            return false;
          }
          break;
        case "department":
          if (asset.assetDepart !== searchObject.department) {
            console.log("department distinto");
            return false;
          }
          break;
      }
    }
    return true;
  };

  function formatData(dateString: string) {
    const dateParts: string[] = dateString.split("-");
    let dateObject = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
    const offset = new Date().getTimezoneOffset();
    dateObject = new Date(dateObject.getTime() - offset * 60 * 1000);
    console.log(dateObject);
    return dateObject.getTime();
  }

  const SearchInAssets = (sdata: SearchObject) => {
    const idOrg = Number(localStorage.getItem("orgId"));

    CallGetOrganizationAssets(idOrg).then(async (response) => {
      const [assets, assetsEdited] = response;
      const cont = assets.length;
      const contEdit = assetsEdited.length;
      const container: AssetsInList[] = [];
      //let object = new container;
      for (let i = 0; i < cont; i++) {
        const asset: AssetsInList = {
          name: assets[i].name,
          assetType: Number(assets[i].assetType),
          assetDepart: Number(assets[i].assetDepart),
          assetTS: AssetTypes[assets[i].assetType],
          creationDate: Number(assets[i].creationDate),
          adquireDate: Number(assets[i].adquireDate),
          originalId: Number(assets[i].index),
          index: Number(assets[i].index),
        };
        const searchreturn = searchCondition(sdata, asset);
        console.log("busqueda " + searchreturn + " " + asset.name);
        if (searchreturn) container.push(asset);
      }
      for (let o = 0; o < contEdit; o++) {
        const originalAsset = await CallGetAsset(
          assetsEdited[o].originalAssetId
        );
        console.log("depart" + Number(originalAsset.assetDepart));
        const asset: AssetsInList = {
          name: assetsEdited[o].name,
          assetType: assetsEdited[o].assetType,
          assetTS: AssetTypes[assetsEdited[o].assetType],
          assetDepart: Number(originalAsset.assetDepart),
          creationDate: Number(assetsEdited[o].creationDate),
          adquireDate: Number(assetsEdited[o].adquireDate),
          originalId: Number(assetsEdited[o].originalAssetId),
          index: Number(assetsEdited[o].index),
        };
        const searchreturn = searchCondition(sdata, asset);
        console.log("busqueda" + searchreturn);
        if (searchreturn) container.push(asset);
      }
      const commentCont: number[] = [];
      for (let e = 0; e < container.length; e++) {
        CallGetNumberOfCommentsByAsset(container[e].originalId).then((r) => {
          commentCont.push(Number(r));
          setIsLoading(false);
        });
      }
      setAssets(container);
      console.log("HOLA");
      setIsLoading2(false);
    });
  };

  useEffect(() => {
    CallGetAllDepartmentsFromOrg(
      Number(window.localStorage.getItem("orgId"))
    ).then((r) => {
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

  return (
    <>
      {!isLoading && (
        <>
          {formIndex === 0 && (
            <div className="m-6">
              <Formik
                initialValues={{
                  name: "",
                  adquireDateI: 0,
                  adquireDateF: 0,
                  adquireDateStringI: "",
                  adquireDateStringF: "",
                  creationDateI: 0,
                  creationDateF: 0,
                  creationDateStringI: "",
                  creationDateStringF: "",
                  assetType: "-1",
                  department: "-1",
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                  console.log(data);
                  setSubmitting(true);
                  const sdata: SearchObject = {};
                  if (data.adquireDateStringI !== "")
                    sdata.adquireDateI = formatData(data.adquireDateStringI);
                  if (data.adquireDateStringF !== "")
                    sdata.adquireDateF = formatData(data.adquireDateStringF);
                  if (data.creationDateStringI !== "")
                    sdata.creationDateI = formatData(data.creationDateStringI);
                  if (data.creationDateStringF !== "")
                    sdata.creationDateF = formatData(data.creationDateStringF);
                  if (data.name !== "") sdata.name = data.name;
                  if (data.assetType !== "-1")
                    sdata.assetType = Number(data.assetType);
                  if (data.department !== "-1")
                    sdata.department = Number(data.department);

                  console.log("objeto de busqueda");
                  console.log(sdata);

                  SearchInAssets(sdata);
                  setFormIndex(1);
                }}
              >
                {({ values, errors, handleChange }) => (
                  <Form>
                    <div className="mb-6">
                      <Typography variant="h5">Buscar activos</Typography>
                    </div>

                    <div className="mb-6">
                      <Field
                        name="name"
                        value={values.name}
                        label="Nombre"
                        inputProps={{ maxLength: 255 }}
                        fullWidth
                        error={Boolean(errors.name)}
                        helperText={errors.name ? errors.name : " "}
                        as={TextField}
                      />
                    </div>
                    <div className="flex flex-row justify-center items-center gap-5 my-6">
                      <InputLabel id="test-select-label">
                        Intervalo de Fechas Adquisición
                      </InputLabel>
                      <div className="w-1/3">
                        <Field
                          id="adquireDateStringI"
                          label="Fecha de inicio"
                          value={values.adquireDateStringI}
                          error={Boolean(errors.adquireDateStringI)}
                          type="date"
                          fullWidth
                          //sx={{ width: 300 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          as={TextField}
                        />
                      </div>
                      <div className="w-1/3">
                        <Field
                          id="adquireDateStringF"
                          label="Fecha fin"
                          value={values.adquireDateStringF}
                          error={Boolean(errors.adquireDateStringF)}
                          type="date"
                          fullWidth
                          //sx={{ width: 300 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          as={TextField}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-5 my-7">
                      <InputLabel className="mr-1" id="test-select-label">
                        Intervalo de Fechas de Creación
                      </InputLabel>
                      <div className="w-1/3">
                        <Field
                          id="creationDateStringI"
                          label="Fecha de inicio"
                          value={values.creationDateStringI}
                          error={Boolean(errors.creationDateStringI)}
                          type="date"
                          fullWidth
                          //sx={{ width: 300 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          as={TextField}
                        />
                      </div>
                      <div className="w-1/3">
                        <Field
                          id="creationDateStringF"
                          label="Fecha fin"
                          value={values.creationDateStringF}
                          error={Boolean(errors.creationDateStringF)}
                          type="date"
                          fullWidth
                          //sx={{ width: 300 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          as={TextField}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row my-7 gap-8">
                      <div className="w-1/2">
                        <InputLabel id="test-select-label">
                          Tipo de activo
                        </InputLabel>
                        <Field
                          name="assetType"
                          className="px-2 my-2"
                          variant="outlined"
                          onChange={handleChange}
                          fullWidth
                          required
                          error={Boolean(errors.assetType)}
                          value={values.assetType}
                          as={Select}
                        >
                          <MenuItem value={-1}> - </MenuItem>
                          <MenuItem value={0}>Software</MenuItem>
                          <MenuItem value={1}>Hardware</MenuItem>
                          <MenuItem value={2}>Documento</MenuItem>
                          <MenuItem value={3}>Datos</MenuItem>
                          <MenuItem value={4}>Red</MenuItem>
                          <MenuItem value={5}>Nube</MenuItem>
                          <MenuItem value={6}>No determinado</MenuItem>
                        </Field>
                      </div>
                      <div className="w-1/2">
                        <InputLabel id="department-label" className="">
                          Departamento
                        </InputLabel>
                        <Field
                          name="department"
                          className="px-2 my-2"
                          variant="outlined"
                          onChange={handleChange}
                          required
                          fullWidth
                          /* error={Boolean(errors.assetType)}  */
                          value={values.department}
                          as={Select}
                        >
                          <MenuItem value={-1}> - </MenuItem>
                          <MenuItem value={0}>Sin departamento</MenuItem>
                          {!isLoading && departments && 
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
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Realizar Búsqueda
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
          {formIndex === 1 && (
            <>
              {isLoading2 && <Skeleton></Skeleton>}
              {!isLoading2 && <SimpleAssetsTable assets={assets} />}
            </>
          )}
        </>
      )}
    </>
  );
}
