import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, InputLabel, MenuItem, Select, Skeleton, TextField, Typography } from "@mui/material";
import { CallGetAllDepartmentsFromOrg, CallGetNumberOfCommentsByAsset, CallInsertComment } from "components/wallet/userCall";
import { AssetsInList, AssetTypes, Department, Notify } from "types";
import { useNavigate } from "react-router-dom";
import { CallGetAsset, CallGetOrganizationAssets } from "components/wallet/contractCall";
import SimpleAssetsTable from "components/atoms/Table/simpleAssetsTable";
import { SearchObject } from "types";
import { ConnectingAirportsOutlined } from "@mui/icons-material";



const validationSchema = Yup.object({
    name: Yup.string().max(60),
    adquireDate: Yup.string().max(40),
  });

const SearchForm = (props: any) => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState<Department[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);

    const [formIndex, setFormIndex] = useState(0);
    const [assets, setAssets] = useState<any>({});
    const [numComments, setNumComments] = useState<Number[]>();

    const searchCondition = (searchObject:SearchObject, asset:AssetsInList) => {
      const keyList = Object.keys(searchObject);
      console.log(keyList);
      for(var i = 0; i < keyList.length; i++){
        switch(keyList[i]){
          case "name":
            if(!asset.name.toLowerCase().includes(searchObject.name!.toLowerCase())) {
              console.log("Este asset no tiene ese nombre");
              return false
            }
          break;
          case "adquireDateI":
            console.log(asset.adquireDate!)
            console.log(searchObject.adquireDateI!)
            if(asset.adquireDate! <= searchObject.adquireDateI!) {
              console.log("Adquire date anterior");
              return false
            }
            break;
          case "adquireDateF":
            if(asset.adquireDate! >= searchObject.adquireDateF!) {
              console.log("Adquire date posterior");
              return false
            }
            break;
          case "creationDateI":
            if(asset.creationDate! <= searchObject.creationDateI!) {
              console.log("Creation date anterior");
              return false
            }
            break;
          case "creationDateF":
            if(asset.creationDate! >= searchObject.creationDateF!) {
              console.log("Creation date posterior");
              return false
            }
            break;
          case "assetType":
            if(asset.assetType !== searchObject.assetType!) {
              console.log("tipo de asset distinto");
              return false
            }
            break;
          case "department":
            if(asset.assetDepart !== searchObject.department!) {
              console.log("department distinto");
              return false
            }
            break;
          }

      }
      return true
  }

  function formatData(data:any){
    var dateString = data; 
    var dateParts: Array<String> = dateString.split("-");
    var dateObject = new Date(
            +dateParts[0],
            +dateParts[1] - 1,
            +dateParts[2]
        );
    const offset = dateObject.getTimezoneOffset();
    dateObject = new Date(dateObject.getTime() - offset * 60 * 1000);
    console.log(dateObject);
    return dateObject.getTime();
  }


    const SearchInAssets = (sdata:SearchObject) => {
        const idOrg = Number(localStorage.getItem('idOrg'));

        CallGetOrganizationAssets(idOrg).then(async (response) => {
          const cont = response[0].length;
          const contEdit = response[1].length;
          let container: AssetsInList[] = [];
          //let object = new container;
          for (var i = 0; i < cont; i++) {
            const asset: AssetsInList = {
              name: response[0][i].name,
              assetType: Number(response[0][i].assetType),
              assetDepart: Number(response[0][i].assetDepart),
              assetTS: AssetTypes[response[0][i].assetType],
              creationDate: Number(response[0][i].creationDate),
              adquireDate: Number(response[0][i].adquireDate),
              originalId: Number(response[0][i].index),
              index: Number(response[0][i].index)
            }
            const searchreturn = searchCondition(sdata, asset);
            console.log("busqueda "+ searchreturn + " "+ asset.name);
            if(searchreturn) container.push(asset);            
          }
          for (var o = 0; o < contEdit; o++) {
            const originalAsset = await CallGetAsset(response[1][o].originalAssetId);
            console.log('depart'+Number(originalAsset.assetDepart))
            const asset: AssetsInList = {
              name: response[1][o].name,
              assetType: response[1][o].assetType,
              assetTS: AssetTypes[response[1][o].assetType],
              assetDepart:  Number(originalAsset.assetDepart),
              creationDate: Number(response[1][o].creationDate),
              adquireDate: Number(response[1][o].adquireDate),
              originalId: Number(response[1][o].originalAssetId),
              index: Number(response[1][o].index),
            }
            const searchreturn = searchCondition(sdata, asset);
            console.log("busqueda"+searchreturn);
            if(searchreturn) container.push(asset); 
          }
          let commentCont:Number[] = [];
          for (var e = 0; e < container.length; e++){
            CallGetNumberOfCommentsByAsset(container[e].originalId).then((r)=> {
              commentCont.push(Number(r))
              setIsLoading(false);
  
            });
          }
          setNumComments(commentCont);
          setAssets(container);
          console.log("HOLA")
          setIsLoading2(false);
        });
      };

  useEffect(() => {
    CallGetAllDepartmentsFromOrg(Number(window.localStorage.getItem('orgId')!)).then(r=> {
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
        setDepartments(container);
        setIsLoading(false);
      })
  }, []);

return (
    <>
    {!isLoading && (<>
        {formIndex === 0 && (
            <div className="m-6">
            <Formik
              initialValues={{
                  name: '',
                  adquireDateI: 0,
                  adquireDateF: 0,
                  adquireDateStringI: "1999-11-09",
                  adquireDateStringF: "",
                  creationDateI: 0,
                  creationDateF: 0,
                  creationDateStringI: "",
                  creationDateStringF: "",
                  assetType: "-1",
                  department:"-1",
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                  console.log(data);
                  setSubmitting(true);
                  const sdata:SearchObject = {};

                  //TODO FORMAT DATES TO OBTAIN IT
                  if(data.adquireDateStringI !=='') sdata.adquireDateI = formatData(data.adquireDateStringI);
                  if(data.adquireDateStringF !=='') sdata.adquireDateF = formatData(data.adquireDateStringF);
                  if(data.creationDateStringI !=='') sdata.creationDateI = formatData(data.creationDateStringI);
                  if(data.creationDateStringF !=='') sdata.creationDateF = formatData(data.creationDateStringF);
                  if(data.name !=='') sdata.name=data.name;
                  if(data.assetType !=='-1') sdata.assetType = Number(data.assetType);
                  if(data.department !=='-1') sdata.department = Number(data.department);

                  console.log("objeto de busqueda")
                  console.log(sdata);
                  
                  SearchInAssets(sdata);
                  setFormIndex(1);

              }}
            >
              {({ values, isSubmitting, errors, handleChange }) => (
                 
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
                {isLoading2 && (
                    <Skeleton></Skeleton>
                )}
                {!isLoading2 && (
                    <SimpleAssetsTable {...assets}/>
                )}
            </>
        )}
    </>
        
    )}     
    </>
    
  );
};
export default SearchForm;
