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
      <Card className="gap-7 p-20 flex flex-col items-center">
        <div className="items-center">
          <h4 className="font-normal m-0 text-3xl">
            Bienvenido,{" "}
          </h4>
          <h4 className="font-extrabold mt-2 text-3xl">
            {admin.name}{" "}
          </h4>
        </div>
        <div className="flex flex-row gap-4 mt-5">
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
