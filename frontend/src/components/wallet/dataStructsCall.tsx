import { ethers } from "ethers";
import { License } from "types";
import addresses from "../../assets/addresses.json";

declare var window: any;
const mainABI2 = require("./dataStructAbi.json");
const contractAddress2 = addresses.DataStructs;
const provider2 = new ethers.providers.Web3Provider(window.ethereum);
const contract2 = new ethers.Contract(
        contractAddress2,
        mainABI2,
        provider2.getSigner());


//TODO CHECK IDS
export async function CallGetSoftwareAsset(props: any){
    const ret = contract2.getSoftwareAsset(props);
    return ret;
}

export async function CallGetHardwareAsset(props: any){
    return contract2.getHardwareAsset(props);
}

export async function CallGetDocAsset(props: any){
    return contract2.getDocAsset(props);
}

export async function CallGetDataAsset(props: any){
    return contract2.getDataAsset(props);
}

export async function CallGetNetworkAsset(props: any){
    return contract2.getNetworkAsset(props);
}

export async function CallGetCloudAsset(props: any){
    return contract2.getCloudAsset(props);
}

export async function CallGetOtherAsset(props: any){
    return contract2.getOtherAsset(props);
}


export async function CallInsertLicenseToSoft(license:License, assetId:number){
    contract2.insertLicenseToSoft(license.name, license.key, license.adquireDate, license.expirationDate, license.licenseType, assetId);
}

export async function CallGetLicenseByAsset(assetId: number){
    return contract2.getLicenseByAsset(assetId);
}


export async function CallUpdateSoftwareAsset(data:any, assetId:number){
    try{
        await contract2.updateSoftwareAsset(data.version, data.provider, data.stype, assetId);
              const correctText = "Tipo del Activo editado correctamente.";
      
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

export async function CallUpdateHardwareAsset(data:any, assetId:number){
    try{
        await contract2.updateHardwareAsset(data.model, data.provider, data.serialNumber, data.htype, assetId);
              const correctText = "Tipo del Activo editado correctamente.";
      
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

export async function CallUpdateDocAsset(data:any, assetId:number){
    try{
        await contract2.updateDocAsset(data.description, data.location, data.doctype, assetId);
              const correctText = "Tipo del Activo editado correctamente.";
      
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

export async function CallUpdateDataAsset(data:any, assetId:number){
    try{
        await contract2.updateDataAsset(data.location, data.local, assetId);
              const correctText = "Tipo del Activo editado correctamente.";
      
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

export async function CallUpdateNetworkAsset(data:any, assetId:number){
    try{
        await contract2.updateNetworkAsset(data.cidrblock, data.nat, assetId);
              const correctText = "Tipo del Activo editado correctamente.";
      
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

export async function CallUpdateCloudAsset(data:any, assetId:number){
    try{
        await contract2.updateCloudAsset(data.url, data.domain, assetId);
              const correctText = "Tipo del Activo editado correctamente.";
      
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

export async function CallUpdateOtherAsset(data:any, assetId:number){
    try{
        await contract2.updateOtherAsset(data.description, assetId);
              const correctText = "Tipo del Activo editado correctamente.";
      
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