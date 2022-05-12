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
    const text = "Usuario creado correctamente. Guardando datos en la Blockchain...";
    const notify = {
        isOpen: true,
        message: text,
        type: "success",
      };
    return notify;
  } catch (e: any) {
    let errorM = "";
    try{
      if (e.data.message.includes("OrgId not found")) {
        errorM = "El id de la organización no existe";
      } else if (e.data.message.includes("user is admin")) {
        errorM = "La billetera elegida es del administrador. Por favor elige otra";
      } else if (e.data.message.includes("Address registered")) {
        errorM = "La dirección de la cartera ya se encuentra registrada";
      } 
    }catch {
      errorM = "Por favor, acepta la transacción en metamask";
    
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
      try{
        await contract.insertUsersToAsset(assetId, userIds);
              const correctText = "Usuarios asignados al activo correctamente";
      
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
    await contract.insertDepartment(props.name, props.description, props.telephone, props.orgId, signerAddress);
    const text = "Departamento creado correctamente. Guardando datos en la Blockchain...";
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
        const errorM = "La billetera conectada no pertenece a la organización";
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
  console.log("Introducir usuario "+ userIds + " a departamento "+ departId);
  try{
    await contract.insertUserToDepartment(departId, userIds);
          const correctText = "Usuario introducido en el departamento correctamente.";
  
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

export async function CallDeleteUsersFromDepartment(departId: number, userIds: number[]) {
  
  console.log("Delete users: "+userIds+ " from department "+departId);
  

  try{
    await contract.deleteUsersFromDepartment(departId, userIds);
          const correctText = "Usuarios retirados del departamento correctamente";
  
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



//Department assets
export async function CallInsertAssetToDepartment(departId: number, assetsIds: number[]) {
    try{
    await contract.insertAssetToDepartment(departId, assetsIds);
          const correctText = "Activo introducido en departamento correctamente";

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

export async function CallDeleteAssetFromDepartment(departId: number, assetsIds: number[]) {
  try{
    await contract.deleteAssetFromDepartment(departId, assetsIds);
    const correctText = "Activo introducido en departamento correctamente";
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

export async function CallGetAssetsIdsFromDepart(departId: number) {
  return contract.getAssetsIdsFromDepart(departId);
}


//NEW ASSETS WITH DEPARTMENT
export async function CallInsertNewSAssetWithDepartment(asset:Asset, props: any){
  try{
        let signerAddress = await provider.getSigner().getAddress();
      await contract.insertNewSAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
        asset.assetType, asset.assetDepart, props.version, props.provider, props.stype, signerAddress); 
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

export async function CallInsertNewHAssetWithDepartment(asset:Asset, props: any){
  
  try{
    let signerAddress = await provider.getSigner().getAddress();
  await contract.insertNewHAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
      asset.assetType, asset.assetDepart, props.model, props.provider, props.serialNumber, props.htype, signerAddress);  
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

export async function CallInsertNewDocAssetWithDepartment(asset:Asset, props: any){ 
      try{
        let signerAddress = await provider.getSigner().getAddress();
      await  contract.insertNewDocAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
        asset.assetType,  asset.assetDepart,props.name, props.location, props.doctype, signerAddress); 
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

export async function CallInsertNewDataAssetWithDepartment(asset:Asset, props: any){ 
      try{
        let signerAddress = await provider.getSigner().getAddress();
      await  contract.insertNewDataAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
        asset.assetType, asset.assetDepart, props.location, props.local, signerAddress);   
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

export async function CallInsertNewNAssetWithDepartment(asset:Asset, props: any){
      try{
        let signerAddress = await provider.getSigner().getAddress();
      await  contract.insertNewNAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
        asset.assetType, asset.assetDepart, props.cidrblock, props.nat, signerAddress); 
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

export async function CallInsertNewCAssetWithDepartment(asset:Asset, props: any){
    try{
        let signerAddress = await provider.getSigner().getAddress();
      await  contract.insertNewCAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
        asset.assetType, asset.assetDepart, props.url, props.domain, signerAddress); 
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

export async function CallInsertNewOAssetWithDepartment(asset:Asset, props: any){
      try{
        let signerAddress = await provider.getSigner().getAddress();
      await  contract.insertNewOAssetWithDepartment(asset.name, asset.orgId, asset.adquireDate, asset.creationDate, 
        asset.assetType, asset.assetDepart, props.description, signerAddress); 
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


//COMMENTS
export async function CallInsertComment(comment:any, assetId:number, orgId:number){
  try {
    let signerAddress = await provider.getSigner().getAddress();
    await contract.insertComment(comment.description, comment.date, assetId, orgId, signerAddress)
    const correctText = "Activo creado correctamente";
    
            const notify = {
                isOpen: true,
                message: correctText,
                type: "success",
            };
        return notify;
  } catch (e:any){
    try {
      if(e.data.message.includes('Administrator')){
        const errorM = "El administrador no puede crear comentarios.";
        const notify = {
                isOpen: true,
                message: errorM,
                type: "error",
            };
        return notify
      }
      if(e.data.message.includes('User')){
        const errorM = "Esta billetera no pertenece a la organización.";
        const notify = {
                isOpen: true,
                message: errorM,
                type: "error",
            };
        return notify
      }
    } catch {
      const errorM = "Por favor, acepta la transacción en metamask";
      const notify = {
                isOpen: true,
                message: errorM,
                type: "error",
            };
      return notify
    }
    
  }
  
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
