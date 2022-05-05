import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { Users } from "types";
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


//DEPARTMENTS
export async function CallInsertDepartment(props: any) {
  contract.insertDepartment(props.name, props.description, props.telephone, props.orgId);
}

export async function CallGetDepartFromOrg(props: number) {
  return contract.getDepartFromOrg(props);
}


export async function CallGetUsersFromDepart(props: number) {
  return contract.getUsersFromDepart(props);
}

