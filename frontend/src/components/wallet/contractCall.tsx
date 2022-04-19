import React from "react";
import { ethers } from "ethers";

declare var window: any;
const mainABI = require("./mainABI.json");
const contractAddress = "0xC0fc6eA23A178C76271e8EF15a590f0F91787512";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
        contractAddress,
        mainABI,
        provider.getSigner());


export async function CallInsertOrg(props: any) {
    const signer = provider.getSigner();
    let signerAddress = await signer.getAddress();

    const input = props.data;
    console.log(signerAddress, input.firstName, input.lastName, input.email, input.telephoneA,
        input.orgName, input.address, input.telephoneOrg);

    contract.insertOrgAndAdmin(
        signerAddress, input.firstName, input.lastName, input.email, input.telephoneA,
        input.orgName, input.address, input.telephoneOrg);
}


export async function CallIsAdministrator(props: number) {
    console.log("Is administrator " + props);
    const isAdmin: Boolean = contract.isAdministrator(props)
    return isAdmin;
}


export async function CallGetAdminToOrg(props: number) {
    const orgId = contract.getAdminToOrg(props)
    return orgId;
}




export async function CallInsertAsset(props: any) {
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
    //TODO change ORG ID
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

export async function CallGetOrganizationData(props: Number) {
    const organization = contract.getOrg(props);
    return organization;
}

export async function CallGetAdminData(props: Number) {
    const admin = contract.getAdmin(props);
    return admin;
}


export async function CallInsertEditedAsset(props: any) {
    const input = props;
    const signer = provider.getSigner();
    let signerAddress = await signer.getAddress();
    input.originalAssetId = input.originalId;
    console.log(input);
    input.organizationId=localStorage.getItem('orgId');

    contract.insertEditedAsset(input.originalAssetId, input.name, input.organizationId, input.adquireDate, 
       input.creationDate, input.deleted, input.assetType);
}



