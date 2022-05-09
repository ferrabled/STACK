import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { Asset, Comment, Users } from "types";
import addresses from "../../assets/addresses.json";

declare var window: any;

const usersABI = require("./users.json");
const contractAddress = addresses.Users;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
  contractAddress,
  usersABI,
  provider.getSigner()
);

export async function WaitForInsertUser(data: any) {
  //const navigate = useNavigate()

  const handleRegister = (address: any, name: string, surname: string) => {
    console.log("Registro");
    provider
      .getSigner()
      .getAddress()
      .then((myaddress) => {
        if (
          data.name === name &&
          data.surname === surname &&
          address == myaddress
        ) {
          console.log("Registro nuevo");
          window.location.replace("/home");
        }
        return () => {
          contract.removeAllListeners("Register");
        };
      });
  };

  contract.on("Register", (address, name, surname) =>
    handleRegister(address, name, surname)
  );
}

export async function CallInsertUser(user: any) {
  console.log("Add new user");
  const signer = provider.getSigner();
  let signerAddress = await signer.getAddress();
  try {
    await contract.insertUser(
      signerAddress,
      user.name,
      user.surname,
      user.email,
      user.telephone,
      user.orgId
    );
  } catch (e: any) {
    console.log(e.data.message);
    let errorM = "";
    if (e.data.message.includes("OrgId not found")) {
      errorM = "El id de la organización no existe";
    } else if (e.data.message.includes("Address already registered")) {
      errorM = "La dirección de la cartera ya se encuentra registrada";
    }
    const notify = {
      isOpen: true,
      message: errorM,
      type: "error",
    };
    return notify;
  }
}



export async function CallGetAllUsersFromOrg(props: Number) {
    console.log("Get all users");
    const users = contract.getAllUsersFromOrg(props);
    return users;
  }

  export async function CallGetUserAssets(props: Number) {
    console.log("Get user "+props+" assets");
    const assetsList = contract.getUserAssets(props);
    return assetsList;
  }

  export async function CallInsertUsersToAsset(assetId: number, userIds: number[]){
      console.log("Insert users: " + userIds + " to asset "+assetId);
      contract.insertUsersToAsset(assetId, userIds);
  }



  export async function CallGetAssetUsers(assetId: number){
    console.log("Get users from asset " + assetId);
    return contract.getAssetUsers(assetId);
}


export async function CallGetNumUsersFromOrg(assetId: number){
  return contract.getNumUsersFromOrg(assetId);
}

//TODO notifications
//DEPARTMENTS
export async function CallInsertDepartment(props: any) {
  let signerAddress = await provider.getSigner().getAddress();
  try {
    contract.insertDepartment(props.name, props.description, props.telephone, props.orgId, signerAddress);
  } catch (e: any){
    console.log(e);
  }
}

export async function CallGetDepartment(props: number){
  return contract.getDepartment(props);
}

export async function CallGetAllDepartmentsFromOrg(props: number) {
  return contract.getAllDepartmentsFromOrg(props);
}

export async function CallGetUsersFromDepart(props: number) {
  return contract.getUsersFromDepart(props);
}

export async function CallInsertUserToDepartment(departId: number, userIds: number[]) {
  contract.insertUserToDepartment(departId, userIds);
} 

export async function CallDeleteUsersFromDepartment(departId: number, userIds: number[]) {
  contract.deleteAssetFromDepartment(departId, userIds);
}



//Department assets
export async function CallInsertAssetToDepartment(departId: number, assetsIds: number[]) {
  contract.insertAssetToDepartment(departId, assetsIds);
}

export async function CallDeleteAssetFromDepartment(departId: number, assetsIds: number[]) {
  contract.deleteAssetFromDepartment(departId, assetsIds);
}

export async function CallGetAssetsIdsFromDepart(departId: number) {
  return contract.getAssetsIdsFromDepart(departId);
}


//NEW ASSETS WITH DEPARTMENT
export async function CallInsertNewSAssetWithDepartment(asset:Asset, props: any){
  let signerAddress = await provider.getSigner().getAddress();
  contract.insertNewSAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
      asset.assetType, asset.assetDepart, props.version, props.provider, props.stype, signerAddress); 
}

export async function CallInsertNewHAssetWithDepartment(asset:Asset, props: any){
  let signerAddress = await provider.getSigner().getAddress();
  contract.insertNewHAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
      asset.assetType, asset.assetDepart, props.model, props.provider, props.serialNumber, props.htype, signerAddress); 
}

export async function CallInsertNewDocAssetWithDepartment(asset:Asset, props: any){
  let signerAddress = await provider.getSigner().getAddress();
  contract.insertNewDocAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
      asset.assetType,  asset.assetDepart,props.name, props.location, props.doctype, signerAddress); 
}

export async function CallInsertNewDataAssetWithDepartment(asset:Asset, props: any){
  let signerAddress = await provider.getSigner().getAddress();
  contract.insertNewDataAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
      asset.assetType, asset.assetDepart, props.location, props.local, signerAddress); 
}

export async function CallInsertNewNAssetWithDepartment(asset:Asset, props: any){
  let signerAddress = await provider.getSigner().getAddress();
  contract.insertNewNAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
      asset.assetType, asset.assetDepart, props.cidrblock, props.nat, signerAddress); 
}

export async function CallInsertNewCAssetWithDepartment(asset:Asset, props: any){
  let signerAddress = await provider.getSigner().getAddress();
  contract.insertNewCAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
      asset.assetType, asset.assetDepart, props.url, props.domain, signerAddress); 
}

export async function CallInsertNewOAssetWithDepartment(asset:Asset, props: any){
  let signerAddress = await provider.getSigner().getAddress();
  contract.insertNewOAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
      asset.assetType, asset.assetDepart, props.description, signerAddress); 
}


//COMMENTS
export async function CallInsertComment(comment:Comment, assetId:number, orgId:number){
  let signerAddress = await provider.getSigner().getAddress();
  contract.insertComment(comment.description, comment.date, assetId, orgId, signerAddress)
}

export async function CallGetCommentsByAsset(assetId:number){
  return contract.getCommentsByAsset(assetId);
}

export async function CallGetNumberOfCommentsByAsset(assetId:number){
  return contract.getNumberOfCommentsByAsset(assetId);
}

export async function CallGetUsersById(usersIds:number[]){
  return contract.getUsersById(usersIds);
}
