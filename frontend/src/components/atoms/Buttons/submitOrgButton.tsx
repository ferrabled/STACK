import React from "react";
import { Button } from "@mui/material";
import { ethers } from "ethers";
import { OrganizationFormValues } from "types";

declare var window: any;
const contractAddress = "0xFE0B81225571Afa0A7299152f43CE86376778126";
const mainABI = require("./mainABI.json");

const ButtonSOrganization = () => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      mainABI,
      provider.getSigner()
    );
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    if (false) {
      console.log(mainABI);
      console.log("Create Organization");
      await contract.insertUser(signerAddress, "Nicolas", "ola", 635869645);
    } else {
      console.log("Retrieve Organization");
      const pepe = await contract.getOrg(40);
      console.log(pepe);
    }

    //contract.insertUser(item)
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
