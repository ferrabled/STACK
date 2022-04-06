import React from "react";

import { Error } from "components/atoms";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Card } from "@mui/material";
import ButtonSOrganization from "components/atoms/Buttons/submitOrgButton";
import AssetForm from "components/Forms/assetForm";

const NewAsset = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const handleSubmit = () => {
    console.log("Obtenemos estos valores")
    //console.log(values)
  };

 

  return (
    <div >
      <Card className="my-3">
        <AssetForm/>
      </Card>
    </div>
  );
};

export default NewAsset;