import { ethers } from "ethers";
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
export async function CallInsertSoftware(props: any){
    console.log(props); 
    contract2.insertSoftware(props.version, props.provider, 0, props.type, 1);
}

export async function CallInsertHardware(props: any){
    console.log(props); 
    contract2.insertSoftware(props.model, props.provider, props.serialNumber, props.type, 1);
}

export async function CallInsertDocument(props: any){
    console.log(props); 
    contract2.insertSoftware(props.name, props.location, props.doctype, 1);
}

export async function CallInsertData(props: any){
    console.log(props); 
    contract2.insertSoftware(props.location, props.local, 1);
}

export async function CallInsertNetwork(props: any){
    console.log(props); 
    contract2.insertSoftware(props.url, props.domain, 1);
}

export async function CallInsertOther(props: any){
    console.log(props); 
    contract2.insertSoftware(props.description, 1);
}


//TODO CHECK IDS
export async function CallGetSoftwareAsset(props: any){
    console.log("HOLA")
    const ret = contract2.getSoftwareAsset(props);
    return ret;
}