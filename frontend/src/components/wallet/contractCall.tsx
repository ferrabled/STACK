import React from "react";
import { ethers } from "ethers";

declare var window: any;
const mainABI = require("./mainABI.json");
const contractAddress = "0xa931baD6cec3f4546c0C5695008Db85e663C36EF";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
        contractAddress,
        mainABI,
        provider.getSigner());

export async function CallInsertAsset(props: any) {
    //const contractAddress = "0xa931baD6cec3f4546c0C5695008Db85e663C36EF";
    console.log(props);
    const input = props;
    //const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //const provider = new ethers.providers.Web3Provider(window.ethereum);
    /* const contract = new ethers.Contract(
        contractAddress,
        mainABI,
        provider.getSigner());
     */  
    const signer = provider.getSigner();
    let signerAddress = await signer.getAddress();
    console.log("HOLA");
    input.organizationId=2;

    contract.insertAsset(input.name, input.organizationId, input.adquireDate, 
       input.creationDate, input.assetType);
}

export async function CallGetOrganizationAssets(props: Number){
    const contract = new ethers.Contract(
        contractAddress,
        mainABI,
        provider.getSigner());

    const assets = contract.getAllAssetsFromOrg(props);
    return assets;
}


export async function CallGetAsset(props: Number) {
    const contract = new ethers.Contract(
        contractAddress,
        mainABI,
        provider.getSigner());

    const asset = contract.getAsset(props);
    return asset;
}


//export default { CallInsertAsset, CallGetOrganizationAssets};


