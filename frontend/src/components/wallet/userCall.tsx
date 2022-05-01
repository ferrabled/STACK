import { ethers } from "ethers";
import { Users } from "types";
import addresses from "../../assets/addresses.json";

declare var window: any;
const mainABI = require("./json");
const contractAddress = addresses.Users;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
        contractAddress,
        mainABI,
        provider.getSigner());


export async function CallInsertUser(user: Users){
    console.log("Add new user");  
    const signer = provider.getSigner();
    let signerAddress = await signer.getAddress();
    contract.insertUser(signerAddress, user.name, user.surname, user.email, user.telephone, user.orgId);
}
    
   