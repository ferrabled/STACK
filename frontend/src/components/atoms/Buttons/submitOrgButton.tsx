import React from "react";
import { Button } from "@mui/material";
import { ethers } from "ethers";
import { OrganizationFormValues } from "types";

declare var window: any
const contractAddress = "0xE6dc1347E89ec813a3bEE693568Add789E76BF41";
const mainABI = require("./mainABI.json");



const ButtonSOrganization = () => {


    const item: OrganizationFormValues = {
        nameO:"paco",
        address:"mi calle",
        telephoneO: 6354
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, mainABI, provider.getSigner());
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        if(false){
            console.log(mainABI)
            console.log("Create Organization");
            

            await contract.insertUser(signerAddress, "paco","mi calle",6354);
        } else {
            console.log("Retrieve Organization");
            const pepe = await contract.getOrg(40);
            console.log(pepe);
        }
        
        

        
        //contract.insertUser(item)

    };

return (
    <div>
    <Button variant="contained" onClick={handleSubmit}>FINALIZAR</Button></div>
);

};


export default ButtonSOrganization;

