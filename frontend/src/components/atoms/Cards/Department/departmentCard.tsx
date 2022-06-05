import { Card, Typography } from "@mui/material";
import { Department } from "types";

const DepartmentCard = ({ department }: { department: Department }) => {
  return (
    <Card id="Department" className="p-5 m-5">
      <div className="flex flex-col justify-between">
        <div className="mb-4">
          <Typography variant="h6">Datos del Departamento</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Nombre</Typography>
          <div>{department.name}</div>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Descripción</Typography>
          <div>{department.description}</div>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Teléfono</Typography>
          <div>{department.telephone}</div>
        </div>
      </div>
    </Card>
  );
};

export default DepartmentCard;
