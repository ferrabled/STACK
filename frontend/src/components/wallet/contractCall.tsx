import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Asset } from "types";
import addresses from "../../assets/addresses.json";


declare var window: any;
const mainABI = require("./mainABI.json");

const contractAddress = addresses.Main;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
            contractAddress,
            mainABI,
            provider.getSigner());
        
export async function CallInsertOrg(input: any) {
    const signer = provider.getSigner();
    let signerAddress = await signer.getAddress();
    console.log(input);
    

    try {
        await contract.insertOrgAndAdmin(
            signerAddress, input.firstName, input.lastName, input.email, input.telephoneA,
            input.orgName, input.address, input.telephoneOrg);
        const text = "Organización creada correctamente. Guardando datos en la Blockchain...";
        const notify = {
            isOpen: true,
            message: text,
            type: "success",
          };
        return notify
    } catch (e:any) {
        try {
            if(e.data.message.includes("revert")){
            console.log(e.data.message);
            const errorM = "Ya existe un administrador con esta billetera, por favor, elige otra";
            const notify = {
                isOpen: true,
                message: errorM,
                type: "error",
            };
            return notify;
            }
        } catch {
            console.log(e);
            const errorM = "Por favor, acepta la transacción en metamask";
            const notify = {
                isOpen: true,
                message: errorM,
                type: "error",
            };
            return notify;
        }
        
    }
    
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

export async function CallInsertNewSoftAsset(asset:Asset, props: any){
    try{
        await contract.insertNewSoftAsset(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
            asset.assetType, asset.assetDepart, props.version, props.provider, props.stype); 
            const correctText = "Activo creado correctamente";

            const notify = {
                isOpen: true,
                message: correctText,
                type: "success",
            };
        return notify;
    } catch{
        const errorM = "Por favor, acepta la transacción en metamask";
        const notify = {
                isOpen: true,
                message: errorM,
                type: "error",
            };
        return notify
    }
    
}

export async function CallInsertNewHardAsset(asset:Asset, props: any){
        try{
            await contract.insertNewHardAsset(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
                asset.assetType, asset.assetDepart, props.model, props.provider, props.serialNumber, props.htype);
                const correctText = "Activo creado correctamente";
    
                const notify = {
                    isOpen: true,
                    message: correctText,
                    type: "success",
                };
            return notify;
        } catch{
            const errorM = "Por favor, acepta la transacción en metamask";
            const notify = {
                    isOpen: true,
                    message: errorM,
                    type: "error",
                };
            return notify
        }
}

export async function CallInsertNewDocAsset(asset:Asset, props: any){
    console.log("Insertar doc")
    try{
        await contract.insertNewDocAsset(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
            asset.assetType,  asset.assetDepart,props.name, props.location, props.doctype); 
            const correctText = "Activo creado correctamente";

            const notify = {
                isOpen: true,
                message: correctText,
                type: "success",
            };
        return notify;
    } catch{
        const errorM = "Por favor, acepta la transacción en metamask";
        const notify = {
                isOpen: true,
                message: errorM,
                type: "error",
            };
        return notify
    }
}

export async function CallInsertNewDataAsset(asset:Asset, props: any){
    try{
        await contract.insertNewDataAsset(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
            asset.assetType, asset.assetDepart, props.location, props.local); 
            const correctText = "Activo creado correctamente";

            const notify = {
                isOpen: true,
                message: correctText,
                type: "success",
            };
        return notify;
    } catch{
        const errorM = "Por favor, acepta la transacción en metamask";
        const notify = {
                isOpen: true,
                message: errorM,
                type: "error",
            };
        return notify
    }
}

export async function CallInsertNewNetworkAsset(asset:Asset, props: any){
    
        try{
            await contract.insertNewNetworkAsset(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
                asset.assetType, asset.assetDepart, props.cidrblock, props.nat); 
                const correctText = "Activo creado correctamente";
    
                const notify = {
                    isOpen: true,
                    message: correctText,
                    type: "success",
                };
            return notify;
        } catch{
            const errorM = "Por favor, acepta la transacción en metamask";
            const notify = {
                    isOpen: true,
                    message: errorM,
                    type: "error",
                };
            return notify
        }
}

export async function CallInsertNewCloudAsset(asset:Asset, props: any){
    
        try{
            await contract.insertNewCloudAsset(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
                asset.assetType, asset.assetDepart, props.url, props.domain); 
                const correctText = "Activo creado correctamente";
    
                const notify = {
                    isOpen: true,
                    message: correctText,
                    type: "success",
                };
            return notify;
        } catch{
            const errorM = "Por favor, acepta la transacción en metamask";
            const notify = {
                    isOpen: true,
                    message: errorM,
                    type: "error",
                };
            return notify
        }
}

export async function CallInsertNewOtherAsset(asset:Asset, props: any){
    try{
            await contract.insertNewOtherAsset(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
                asset.assetType, asset.assetDepart, props.description); 
                const correctText = "Activo creado correctamente";
    
                const notify = {
                    isOpen: true,
                    message: correctText,
                    type: "success",
                };
            return notify;
        } catch{
            const errorM = "Por favor, acepta la transacción en metamask";
            const notify = {
                    isOpen: true,
                    message: errorM,
                    type: "error",
                };
            return notify
        }
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
    try {
        await contract.insertEditedAsset(input.originalAssetId, input.name, input.organizationId, input.adquireDate, 
            input.creationDate, input.deleted, input.assetType, signerAddress);
            const correctText = "Activo editado correctamente";

            const notify = {
                isOpen: true,
                message: correctText,
                type: "success",
            };
        return notify;
    } catch{
        const errorM = "Por favor, acepta la transacción en metamask";
        const notify = {
                isOpen: true,
                message: errorM,
                type: "error",
            };
        return notify
    }
    
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

//Org id and get all assets deleted
export async function CallGetAssetsDeleted(props: number){
    return contract.getAssetsDeleted(props);
}

export async function CallRetrieveListOfAsset(props: number[]){
    return contract.retrieveListOfAsset(props);
}

export async function CallRetrieveOrgData(props: number){
    return contract.retrieveOrgData(props);
}


