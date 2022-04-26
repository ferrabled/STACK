import React from "react";
import { ethers } from "ethers";

declare var window: any;
const mainABI = require("./mainABI.json");
const contractAddress = "0x24c3537138f821A5b65D7FF0EeD028725d4232C1";
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
    input.organizationId=0;

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
    console.log(input);
    contract.insertEditedAsset(input.originalAssetId, input.name, input.organizationId, input.adquireDate, 
       input.creationDate, input.deleted, input.assetType);
}

export async function CallDeleteAsset(props: number) {
    //This call inserts a new edited asset, but with 'deleted:true'
    //Props is the id of the original asset, so we need
    //to check if it has been edited and retrieve last edited data

    CallGetIsAssetEdited(props).then((response) => {
        //if asset has been edited before  
        if(response) {
            CallGetLastAssetEdited(props).then((response)=>{
                console.log("Deleting edited asset");

                console.log(response)
                //formatData(response);
                contract.insertEditedAsset(
                    Number(response.originalAssetId),
                    String(response.name),
                    Number(response.organizationId),
                    Number(response.adquireDate),
                    Number(response.creationDate),
                    true,
                    String(response.assetType)
                    )
            })
        } else {
            CallGetAsset(props).then((response)=> {
                console.log("Deleting Original asset");
                console.log(response) 
                console.log("Borrar")
                contract.insertEditedAsset(
                    Number(response.index),
                    String(response.name),
                    Number(response.organizationId),
                    Number(response.adquireDate),
                    Number(response.creationDate),
                    true,
                    String(response.assetType)
                    )
                /* contract.insertEditedAsset(input.originalAssetId, input.name, input.organizationId, input.adquireDate, 
            input.creationDate, input.deleted, input.assetType); */
            })
            
        }
    });    
}

export async function CallGetIsAssetDeleted(props: number) {
    return contract.getIsAssetDeleted(props);
}

export async function CallGetIsAssetEdited(props: number) {
    return contract.getIsAssetEdited(props);
}

export async function CallGetLastAssetEdited(props: number) {
    return contract.getLastAssetEdited(props);
}

export async function CallGetAssetEdited(props: number) {
    return contract.getAssetEdited(props);
}

export async function CallGetRecordList(props: number){
    return contract.getRecordList(props);
}



