import { Button, Card, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BlockchainAdmin } from "types";

const HomeCard = ({ admin }: { admin: BlockchainAdmin }) => {
  const navigate = useNavigate();

  const redirectAssets = () => {
    navigate("/assets");
  };

  const redirectDepartments = () => {
    navigate("/departments");
  };

  const redirectMyOrganization = () => {
    navigate("/organization");
  };

  return (
    <>
      <Card className="gap-7 p-10 flex flex-col items-center">
        <div className="h-56 items-center ">
          <Typography className="p-8" variant="h4">
            Bienvenido,{" "}
          </Typography>
          <Typography variant="h4">{admin.name} </Typography>
        </div>
        <div className="flex flex-row gap-4">
          <Button
            className="w-64 h-24"
            variant="contained"
            color="primary"
            onClick={redirectAssets}
          >
            <Typography> Activos </Typography>
          </Button>
          <Button
            className="w-64 h-24"
            variant="outlined"
            color="primary"
            onClick={() => navigate("/assets/new")}
          >
            <Typography> Nuevo Activo </Typography>
          </Button>
        </div>

        <div className="flex flex-row gap-4">
          <Button
            className="w-64 h-24"
            variant="contained"
            color="primary"
            onClick={redirectDepartments}
          >
            <Typography> Departamentos </Typography>
          </Button>
          <Button
            className="w-64 h-24"
            variant="outlined"
            color="primary"
            onClick={() => navigate("/assets/new")}
          >
            <Typography> Nuevo Departamento </Typography>
          </Button>
        </div>

        <div className="flex flex-row gap-4">
          <Button
            className="w-64 h-24"
            variant="contained"
            color="primary"
            onClick={redirectMyOrganization}
          >
            <Typography> Mi organización </Typography>
          </Button>
          <Button
            className="w-64 h-24"
            variant="contained"
            color="primary"
            onClick={() => navigate("/users")}
          >
            <Typography> Usuarios </Typography>
          </Button>
        </div>
      </Card>
    </>
  );
};

export default HomeCard;
