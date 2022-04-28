import {
    Button,
    Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";


const urlReg =  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?|(^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*)$/;

const validationSchemaSoft = Yup.object({
    //Software
    version: Yup.string().required("La versión es obligatoria").max(40),
    provider: Yup.string().required("El proveedor es obligatorio").max(40),
    type: Yup.number(),
});

const validationSchemaHard = Yup.object({
    //hardware
    model: Yup.string().required("El modelo es obligatorio").max(40),
    provider: Yup.string().required("El proveedor es obligatorio").max(40),
    serialNumber: Yup.string().required("El número de serie es obligatorio").max(40),
    //htype: Yup.number(),
})

const validationSchemaDoc = Yup.object({
    //doc
    description: Yup.string().required("La descripción es obligatoria").max(20),
    location: Yup.string().required("La ubicación es obligatoria").max(20),
    doctype: Yup.number(),
});


const validationSchemaData = Yup.object({
    //data
    description: Yup.string().required("La descripción es obligatoria").max(20),
    local: Yup.boolean(),
});

const validationSchemaNetwork = Yup.object({
    //network
    url: Yup.string().matches(urlReg, "Introduce una url válida").required("La url es obligatoria").max(100),
    domain: Yup.string().required("El dominio es obligatorio").max(20),
});

const validationSchemaOther = Yup.object({
    //other
    description: Yup.string().required("La descripción es obligatoria").max(20),
})


export const SoftwareForm = () => {
  return (
    <div className="flex flex-col m-6">
      <Formik
        initialValues={{
          version: "",
          provider: "",
          type: 0,
        }}
        validationSchema={validationSchemaSoft}
        onSubmit={(data, { setSubmitting }) => {
            console.log("GHIOALLA");
            setSubmitting(true);
            //setSubmitting(true);
            console.log(data);
        }}
      >
        {({ values, isSubmitting, errors, handleChange, handleSubmit }) => (
          <Form>
            <div className="mb-6">
              <Typography variant="h5">Características del Software</Typography>
            </div>
            <div className="mb-6">
              <Field
                name="version"
                value={values.version}
                label="Versión"
                inputProps={{ maxLength: 255 }}
                fullWidth
                required
                error={Boolean(errors.version)}
                helperText={errors.version ? errors.version : " "}
                as={TextField}
              />
            </div>
            <div className="mb-6">
              <Field
                name="provider"
                value={values.provider}
                label="Proveedor"
                inputProps={{ maxLength: 255 }}
                fullWidth
                required
                error={Boolean(errors.provider)}
                helperText={errors.provider ? errors.provider : " "}
                as={TextField}
              />
            </div>
            <div className="mb-6">
              <div className="lg:w-1/2 min-w-1/2">
                <InputLabel id="test-select-label">Tipo de Software</InputLabel>
                <Field
                  name="assetType"
                  style={{ width: "200px" }}
                  className="px-2 my-2"
                  variant="outlined"
                  onChange={handleChange}
                  select
                  required
                  error={Boolean(errors.type)}
                  value={values.type}
                  fullWidth
                  as={Select}
                >
                  <MenuItem value={0}>Sistema Operativo</MenuItem>
                  <MenuItem value={1}>Firmware</MenuItem>
                  <MenuItem value={2}>Antivirus</MenuItem>
                  <MenuItem value={3}>Aplicación Móvil</MenuItem>
                  <MenuItem value={4}>Código</MenuItem>
                  <MenuItem value={5}>No determinado</MenuItem>
                </Field>
              </div>
            </div>
            <Button fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit()}> Finalizar </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};


export const SubmitAsset = (props:any) => {
  return(
    <Button fullWidth
    type="submit"
    variant="contained"
    color="primary"
    form="form1"
    > Guardar</Button>
  )
}

export const HardwareForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          //TODO initial values
          model: "model",
          provider: "2",
          serialNumber: "12",
          type: "0",
        }}
        
        validationSchema={validationSchemaHard}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          //make async call
        }}
      >
        {({ values, isSubmitting, errors, handleChange }) => (
          <Form id="form1">
            <div className="mb-6">
              <Typography variant="h5">Características del Hardware</Typography>
            </div>
            <div className="mb-6">
              <Field
                name="model"
                value={values.model}
                label="Modelo"
                inputProps={{ maxLength: 255 }}
                fullWidth
                required
                error={Boolean(errors.model)}
                helperText={errors.model ? errors.model : " "}
                as={TextField}
              />
            </div>
            <div className="mb-6">
              <Field
                name="provider"
                value={values.provider}
                label="Proveedor"
                inputProps={{ maxLength: 255 }}
                fullWidth
                required
                error={Boolean(errors.provider)}
                helperText={errors.provider ? errors.provider : " "}
                as={TextField}
              />
            </div>
            <div className="mb-4">
              <Field
                name="serialNumber"
                value={values.serialNumber}
                label="Número de serie"
                inputProps={{ maxLength: 255 }}
                fullWidth
                required
                error={Boolean(errors.serialNumber)}
                helperText={errors.serialNumber ? errors.serialNumber : " "}
                as={TextField}
              />
            </div>
            <div className="mb-9">
              <div className="">
                <InputLabel id="test-select-label">Tipo de Hardware</InputLabel>
                <Field
                  name="hardwareType"
                  className="px-2 my-2 w-1/2"
                  variant="outlined"
                  onChange={handleChange}
                  required
                  /* error={Boolean(errors.assetType)}  */
                  value={values.type}
                  as={Select}
                >
                  <MenuItem value={0}>Ordenador</MenuItem>
                  <MenuItem value={1}>Smartphone</MenuItem>
                  <MenuItem value={2}>Periférico</MenuItem>
                  <MenuItem value={3}>Servidor</MenuItem>
                  <MenuItem value={4}>Sensor</MenuItem>
                  <MenuItem value={5}>Actuador</MenuItem>
                  <MenuItem value={6}>Equipo de Red</MenuItem>
                  <MenuItem value={7}>No determinado</MenuItem>
                </Field>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const DocumentForm = () => {
    return (
      <div className="flex flex-col m-6">
        <Formik
          initialValues={{
            name: "",
            location: "",
            doctype: undefined
          }}
          validationSchema={validationSchemaDoc}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            console.log(data);
            //make async call
          }}
        >
          {({ values, isSubmitting, errors, handleChange }) => (
            <Form>
              <div className="mb-6">
                <Typography variant="h5">Características del Documento</Typography>
              </div>
              <div className="mb-6">
                <Field
                  name="name"
                  value={values.name}
                  label="Nombre"
                  inputProps={{ maxLength: 255 }}
                  fullWidth
                  required
                  error={Boolean(errors.location)}
                  helperText={errors.location ? errors.location : " "}
                  as={TextField}
                />
              </div> 
              <div className="mb-6">
                <Field
                  name="location"
                  value={values.name}
                  label="Ubicación"
                  inputProps={{ maxLength: 255 }}
                  fullWidth
                  required
                  error={Boolean(errors.name)}
                  helperText={errors.name ? errors.name : " "}
                  as={TextField}
                />
              </div>
              <div className="mb-6">
              <div className="lg:w-1/2 min-w-1/2">
                <InputLabel id="test-select-label">Tipo de Documento</InputLabel>
                <Field
                  name="docType"
                  style={{ width: "200px" }}
                  className="px-2 my-2"
                  variant="outlined"
                  onChange={handleChange}
                  select
                  required
                  /* error={Boolean(errors.assetType)}  */
                  value={values.doctype}
                  fullWidth
                  as={Select}
                >
                  <MenuItem value={0}>Contrato</MenuItem>
                  <MenuItem value={1}>Factura</MenuItem>
                  <MenuItem value={2}>No determinado</MenuItem>
                </Field>
              </div>
            </div> 
            </Form>
          )}
        </Formik>
      </div>
    );
  };

export const DataForm = () => {
  return (
    <div className="flex flex-col m-6">
      <Formik
        initialValues={{
          location: "",
          local: false,
        }}
        validationSchema={validationSchemaData}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          //make async call
        }}
      >
        {({ values, isSubmitting, errors, handleChange }) => (
          <Form>
            <div className="mb-6">
              <Typography variant="h5">Características de los Datos</Typography>
            </div>
            <div className="mb-6">
              <Field
                name="location"
                value={values.location}
                label="Ubicación"
                inputProps={{ maxLength: 255 }}
                fullWidth
                required
                error={Boolean(errors.location)}
                helperText={errors.location ? errors.location : " "}
                as={TextField}
              />
            </div>
            <Field 
                as={FormControlLabel}
                name="local"
                value={values.local}
                control={<Checkbox />}
                label="Local"
                onChange={handleChange}
                 />

          </Form>
        )}
      </Formik>
    </div>
  );
};

export const NetworkForm = () => {
    return (
      <div className="flex flex-col m-6">
        <Formik
          initialValues={{
            url: "",
            domain: "",
          }}
          validationSchema={validationSchemaNetwork}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            console.log(data);
            //make async call
          }}
        >
          {({ values, isSubmitting, errors, handleChange }) => (
            <Form>
              <div className="mb-6">
                <Typography variant="h5">Características de la Nube</Typography>
              </div>
              <div className="mb-6">
                <Field
                  name="url"
                  value={values.url}
                  label="Dirección URL"
                  inputProps={{ maxLength: 255 }}
                  fullWidth
                  required
                  error={Boolean(errors.url)}
                  helperText={errors.url ? errors.url : " "}
                  as={TextField}
                />
              </div> 
              <div className="mb-6">
                <Field
                  name="domain"
                  value={values.domain}
                  label="Dominio"
                  inputProps={{ maxLength: 255 }}
                  fullWidth
                  required
                  error={Boolean(errors.domain)}
                  helperText={errors.domain ? errors.domain : " "}
                  as={TextField}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

export const OtherForm = () => {
    return (
      <div className="flex flex-col m-6">
        <Formik
          initialValues={{
            description: "",
          }}
          validationSchema={validationSchemaOther}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            console.log(data);
            //make async call
          }}
        >
          {({ values, isSubmitting, errors, handleChange }) => (
            <Form>
              <div className="mb-6">
                <Typography variant="h5">Características</Typography>
              </div>
              <div className="mb-6">
                <Field
                  name="description"
                  value={values.description}
                  label="Descripción"
                  inputProps={{ maxLength: 255 }}
                  fullWidth
                  required
                  error={Boolean(errors.description)}
                  helperText={errors.description ? errors.description : " "}
                  as={TextField}
                />
              </div> 
            </Form>
          )}
        </Formik>
      </div>
    );
  };