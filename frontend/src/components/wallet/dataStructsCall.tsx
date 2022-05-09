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