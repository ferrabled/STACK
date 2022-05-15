import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { Asset, Comment, Users } from "types";
import addresses from "../../assets/addresses.json";

declare var window: any;

const users2ABI = require("./users2.json");
const contractAddress2 = addresses.Users2;
const provider = new ethers.providers.Web3Provider(window.ethereum);

const contract2 = new ethers.Contract(
    contractAddress2,
    users2ABI,
    provider.getSigner()
);


//NEW ASSETS WITH DEPARTMENT
export async function CallInsertNewSAssetWithDepartment(asset:Asset, props: any){
    try{
          let signerAddress = await provider.getSigner().getAddress();
        await contract2.insertNewSAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
          asset.assetType, asset.assetDepart, props.version, props.provider, props.stype, signerAddress); 
              const correctText = "Activo creado correctamente";
      
              const notify = {
                  isOpen: true,
                  message: correctText,
                  type: "success",
              };
          return notify;
        } catch (e:any){
            try {
                console.log(e);
                if(e.data.message.includes(' revert'))  {
                    const errorM = "Este usuario no pertenece a la organización o al departamento elegido";
                    const notify = {isOpen: true,message: errorM,type: "error"};
                      return notify
                }
            } catch{
                const errorM = "Por favor, acepta la transacción en metamask";
                const notify = {isOpen: true,message: errorM,type: "error"};
                  return notify
            }
        }
  }
  
  export async function CallInsertNewHAssetWithDepartment(asset:Asset, props: any){
    
    try{
      let signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewHAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
        asset.assetType, asset.assetDepart, props.model, props.provider, props.serialNumber, props.htype, signerAddress);  
          const correctText = "Activo creado correctamente";
  
          const notify = {
              isOpen: true,
              message: correctText,
              type: "success",
          };
      return notify;
    } catch (e:any){
        try {
            console.log(e);
            if(e.data.message.includes(' revert'))  {
              const errorM = "Este usuario no pertenece a la organización o al departamento elegido";
              const notify = {isOpen: true,message: errorM,type: "error"};
                  return notify
            }
        } catch{
            const errorM = "Por favor, acepta la transacción en metamask";
            const notify = {isOpen: true,message: errorM,type: "error"};
              return notify
        }
    }
    
    
  }
  
  export async function CallInsertNewDocAssetWithDepartment(asset:Asset, props: any){ 
        try{
          let signerAddress = await provider.getSigner().getAddress();
        await  contract2.insertNewDocAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
          asset.assetType,  asset.assetDepart,props.name, props.location, props.doctype, signerAddress); 
              const correctText = "Activo creado correctamente";
      
              const notify = {
                  isOpen: true,
                  message: correctText,
                  type: "success",
              };
          return notify;
        } catch (e:any){
            try {
                console.log(e);
                if(e.data.message.includes(' revert'))  {
                  const errorM = "Este usuario no pertenece a la organización o al departamento elegido";
                  const notify = {isOpen: true,message: errorM,type: "error"};
                      return notify
                }
            } catch{
                const errorM = "Por favor, acepta la transacción en metamask";
                const notify = {isOpen: true,message: errorM,type: "error"};
                  return notify
            }
        }
  
      }
  
  export async function CallInsertNewDataAssetWithDepartment(asset:Asset, props: any){ 
        try{
          let signerAddress = await provider.getSigner().getAddress();
        await  contract2.insertNewDataAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
          asset.assetType, asset.assetDepart, props.location, props.local, signerAddress);   
              const correctText = "Activo creado correctamente";
      
              const notify = {
                  isOpen: true,
                  message: correctText,
                  type: "success",
              };
          return notify;
        } catch (e:any){
            try {
                console.log(e);
                if(e.data.message.includes(' revert'))  {
                  const errorM = "Este usuario no pertenece a la organización o al departamento elegido";
                  const notify = {isOpen: true,message: errorM,type: "error"};
                      return notify
                }
            } catch{
                const errorM = "Por favor, acepta la transacción en metamask";
                const notify = {isOpen: true,message: errorM,type: "error"};
                  return notify
            }
        }
  }
  
  export async function CallInsertNewNAssetWithDepartment(asset:Asset, props: any){
        try{
          let signerAddress = await provider.getSigner().getAddress();
        await  contract2.insertNewNAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
          asset.assetType, asset.assetDepart, props.cidrblock, props.nat, signerAddress); 
              const correctText = "Activo creado correctamente";
      
              const notify = {
                  isOpen: true,
                  message: correctText,
                  type: "success",
              };
          return notify;
        } catch (e:any){
            try {
                console.log(e);
                if(e.data.message.includes(' revert'))  {
                  const errorM = "Este usuario no pertenece a la organización o al departamento elegido";
                  const notify = {isOpen: true,message: errorM,type: "error"};
                      return notify
                }
            } catch{
                const errorM = "Por favor, acepta la transacción en metamask";
                const notify = {isOpen: true,message: errorM,type: "error"};
                  return notify
            }
        }
  }
  
  export async function CallInsertNewCAssetWithDepartment(asset:Asset, props: any){
      try{
          let signerAddress = await provider.getSigner().getAddress();
        await  contract2.insertNewCAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
          asset.assetType, asset.assetDepart, props.url, props.domain, signerAddress); 
              const correctText = "Activo creado correctamente";
      
              const notify = {
                  isOpen: true,
                  message: correctText,
                  type: "success",
              };
          return notify;
        } catch (e:any){
            try {
                console.log(e);
                if(e.data.message.includes(' revert'))  {
                  const errorM = "Este usuario no pertenece a la organización o al departamento elegido";
                  const notify = {isOpen: true,message: errorM,type: "error"};
                      return notify
                }
            } catch{
                const errorM = "Por favor, acepta la transacción en metamask";
                const notify = {isOpen: true,message: errorM,type: "error"};
                  return notify
            }
        }
  }
  
  export async function CallInsertNewOAssetWithDepartment(asset:Asset, props: any){
    try{
          let signerAddress = await provider.getSigner().getAddress();
        await  contract2.insertNewOAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
          asset.assetType, asset.assetDepart, props.description, signerAddress); 
              const correctText = "Activo creado correctamente";
      
              const notify = {
                  isOpen: true,
                  message: correctText,
                  type: "success",
              };
          return notify;
      } catch (e:any){
          try {
              console.log(e);
              if(e.data.message.includes(' revert'))  {
                const errorM = "Este usuario no pertenece a la organización o al departamento elegido";
                const notify = {isOpen: true,message: errorM,type: "error"};
                    return notify
              }
          } catch{
              const errorM = "Por favor, acepta la transacción en metamask";
              const notify = {isOpen: true,message: errorM,type: "error"};
                return notify
          }
      }
  }
  