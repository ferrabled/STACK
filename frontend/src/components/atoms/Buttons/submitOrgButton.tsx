import React from "react";
import { Button } from "@mui/material";
import { CallInsertOrg } from "components/wallet/contractCall";


const ButtonSOrganization = (props: any) => {
  let telOrg = 0;
  let telA = 0;
  const input = props.data;
  const handleSubmit = async (e: any) => {
  e.preventDefault();
  console.log("Create Organization"); 
  if(typeof input.telephoneA !== "undefined") telA = input.telephoneA;
  console.log(input.telephoneA);
  if(typeof input.telephoneOrg !== "undefined") telOrg = input.telephoneOrg;
  console.log(input.telephoneOrg);
  //TODO INPUT IS EMAIL CHECKBOX
  console.log(props);
  await CallInsertOrg(props);

  };

  return (
    <div>
      <Button variant="contained" onClick={handleSubmit}>
        FINALIZAR
      </Button>
    </div>
  );
};

export default ButtonSOrganization;
