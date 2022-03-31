import React from "react";
import { Button } from "@mui/material";
import { ethers } from "ethers";

declare var window: any;
const contractAddress = "0xb54bE39B89F34BAC8Dc5d58b5e0F4a261099e185";
const mainABI = require("./mainABI.json");

const ButtonSOrganization = (props: any) => {
  let telOrg = 0;
  let telA = 0;
  const input = props.data;
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //await window.ethereum.enable()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      mainABI,
      provider.getSigner()
    );
    const signer = provider.getSigner();
    let signerAddress = await signer.getAddress();
    console.log(input.orgName)
    if (true) {
      console.log(mainABI);
      console.log("Create Organization");
        

      if(typeof input.telephoneA !== "undefined") telA = input.telephoneA;
      console.log(input.telephoneA);

      if(typeof input.telephoneOrg !== "undefined") telOrg = input.telephoneOrg;
      console.log(input.telephoneOrg);
      /* await contract.insertUser(
        signerAddress, input.orgName, input.address, telOrg); */

      //TODO INPUT IS EMAIL CHECKBOX
      await contract.insertOrgAndAdmin(
        signerAddress, input.firstName, input.lastName, input.email, input.telephoneA,
        input.orgName, input.address, telOrg);
      
    } else {
      console.log("Retrieve Organization");
      const pepe = await contract.getOrg(40);
      console.log(pepe);
    }

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
