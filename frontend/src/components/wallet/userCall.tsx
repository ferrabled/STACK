import { ethers } from "ethers";
import { Comment, Department, Notify, TransactionError, User } from "types";
import addresses from "../../assets/addresses.json";
import { CallIsAdministrator } from "./contractCall";
import usersABI from "./users.json";

const contractAddress = addresses.Users;

const provider = new ethers.providers.Web3Provider(window.ethereum);

const contract = new ethers.Contract(
  contractAddress,
  usersABI,
  provider.getSigner()
);

export async function WaitForInsertUser(data: User) {

  const handleRegister = (address: string, name: string, surname: string) => {
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
          window.localStorage.setItem("orgId", String(data.orgId));
          window.localStorage.setItem("userAddress", address);
          window.localStorage.setItem("isAdmin", "false");
          window.location.replace("/home");
        }
        return () => {
          contract.removeAllListeners("Register");
        };
      });
  };

  console.log("Listening to the blockchain");
  contract.on("Register", (address, name, surname) =>
    handleRegister(address, name, surname)
  );
}

export async function CallInsertUser(user: User): Promise<Notify> {
  console.log("Add new user");
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  try {
    const isIndeed = await CallIsAdministrator(signerAddress);
    console.log(isIndeed);
    if (isIndeed) {
      const text = "Esta billetera pertenece a un administrador";
      const notify = {
        isOpen: true,
        message: text,
        type: "error",
      };
      return notify;
    }
    await contract.insertUser(
      signerAddress,
      user.name,
      user.surname,
      user.email,
      Number(user.telephone),
      user.orgId
    );
    const text =
      "Usuario registrado correctamente. Guardando datos en la blockchain...";
    const notify = {
      isOpen: true,
      message: text,
      type: "success",
    };
    return notify;
  } catch (e) {
    const err = e as TransactionError;
    let errorM = "";
    try {
      if (err.data.message.includes("OrgId not found")) {
        errorM = "El id de la organización no existe";
      } else if (err.data.message.includes("user is admin")) {
        errorM =
          "La billetera elegida es del administrador. Por favor elige otra";
      } else if (err.data.message.includes("Address registered")) {
        errorM = "La dirección de la cartera ya se encuentra registrada";
      }
    } catch {
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

export async function CallGetAllUsersFromOrg(props: number) {
  console.log("Get all users");
  const users = contract.getAllUsersFromOrg(props);
  return users;
}

export async function CallGetUserAssets(props: number) {
  console.log("Get user " + props + " assets");
  const assetsList = contract.getUserAssets(props);
  return assetsList;
}

export async function CallInsertUsersToAsset(
  assetId: number,
  userIds: number[]
) {
  console.log("Insert users: " + userIds + " to asset " + assetId);
  try {
    await contract.insertUsersToAsset(assetId, userIds);
    const correctText = "Usuarios asignados al activo correctamente";

    const notify = {
      isOpen: true,
      message: correctText,
      type: "success",
    };
    return notify;
  } catch {
    const errorM = "Por favor, acepta la transacción en metamask";
    const notify = {
      isOpen: true,
      message: errorM,
      type: "error",
    };
    return notify;
  }
}

export async function CallGetAssetUsers(assetId: number) {
  console.log("Get users from asset " + assetId);
  return contract.getAssetUsers(assetId);
}

export async function CallGetNumUsersFromOrg(assetId: number) {
  return contract.getNumUsersFromOrg(assetId);
}

//TODO notifications
//DEPARTMENTS
export async function CallInsertDepartment(props: Department) {
  const signerAddress = await provider.getSigner().getAddress();
  try {
    await contract.insertDepartment(
      props.name,
      props.description,
      Number(props.telephone),
      props.orgId,
      signerAddress
    );
    const text =
      "Departamento creado correctamente. Guardando datos en la Blockchain...";
    const notify = {
      isOpen: true,
      message: text,
      type: "success",
    };
    return notify;
  } catch (e) {
    const err = e as TransactionError;
    try {
      if (err.data.message.includes("revert")) {
        console.log(err.data.message);
        const errorM = "La billetera conectada no pertenece a la organización";
        const notify = {
          isOpen: true,
          message: errorM,
          type: "error",
        };
        return notify;
      } else {
        return {
          isOpen: true,
          message: "Error desconocido",
          type: "error",
        }
      }
    } catch {
      console.log(err);
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

export async function CallGetDepartment(props: number) {
  return contract.getDepartment(props);
}

export async function CallGetAllDepartmentsFromOrg(props: number) {
  return contract.getAllDepartmentsFromOrg(props);
}

export async function CallGetUsersFromDepart(props: number) {
  return contract.getUsersFromDepart(props);
}

export async function CallInsertUserToDepartment(
  departId: number,
  userIds: number[]
) {
  console.log("Introducir usuario " + userIds + " a departamento " + departId);
  try {
    await contract.insertUserToDepartment(departId, userIds);
    const correctText = "Usuario introducido en el departamento correctamente.";

    const notify = {
      isOpen: true,
      message: correctText,
      type: "success",
    };
    return notify;
  } catch {
    const errorM = "Por favor, acepta la transacción en metamask";
    const notify = {
      isOpen: true,
      message: errorM,
      type: "error",
    };
    return notify;
  }
}

export async function CallDeleteUsersFromDepartment(
  departId: number,
  userIds: number[]
) {
  console.log("Delete users: " + userIds + " from department " + departId);

  try {
    await contract.deleteUsersFromDepartment(departId, userIds);
    const correctText = "Usuarios retirados del departamento correctamente";

    const notify = {
      isOpen: true,
      message: correctText,
      type: "success",
    };
    return notify;
  } catch {
    const errorM = "Por favor, acepta la transacción en metamask";
    const notify = {
      isOpen: true,
      message: errorM,
      type: "error",
    };
    return notify;
  }
}

//Department assets
export async function CallInsertAssetToDepartment(
  departId: number,
  assetsIds: number[]
) {
  try {
    await contract.insertAssetToDepartment(departId, assetsIds);
    const correctText = "Activo introducido en departamento correctamente";

    const notify = {
      isOpen: true,
      message: correctText,
      type: "success",
    };
    return notify;
  } catch {
    const errorM = "Por favor, acepta la transacción en metamask";
    const notify = {
      isOpen: true,
      message: errorM,
      type: "error",
    };
    return notify;
  }
}

export async function CallDeleteAssetFromDepartment(
  departId: number,
  assetsIds: number[]
) {
  try {
    await contract.deleteAssetFromDepartment(departId, assetsIds);
    const correctText = "Activo retirado del departamento correctamente";
    const notify = {
      isOpen: true,
      message: correctText,
      type: "success",
    };
    return notify;
  } catch {
    const errorM = "Por favor, acepta la transacción en metamask";
    const notify = {
      isOpen: true,
      message: errorM,
      type: "error",
    };
    return notify;
  }
}

export async function CallGetAssetsIdsFromDepart(departId: number) {
  return contract.getAssetsIdsFromDepart(departId);
}

//COMMENTS
export async function CallInsertComment(
  comment: Comment,
  assetId: number,
  orgId: number
) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract.insertComment(
      comment.description,
      comment.date,
      assetId,
      orgId,
      signerAddress
    );
    const correctText = "Activo creado correctamente";

    const notify = {
      isOpen: true,
      message: correctText,
      type: "success",
    };
    return notify;
  } catch (e) {
    const err = e as TransactionError;
    try {
      if (err.data.message.includes("Administrator")) {
        const errorM = "El administrador no puede crear comentarios.";
        const notify = {
          isOpen: true,
          message: errorM,
          type: "error",
        };
        return notify;
      }
      if (err.data.message.includes("User")) {
        const errorM = "Esta billetera no pertenece a la organización.";
        const notify = {
          isOpen: true,
          message: errorM,
          type: "error",
        };
        return notify;
      }
      return {
        isOpen: true,
        message: "Error desconocido",
        type: "error",
      }
    } catch {
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

export async function CallGetCommentsByAsset(assetId: number) {
  return contract.getCommentsByAsset(assetId);
}

export async function CallGetNumberOfCommentsByAsset(assetId: number) {
  return contract.getNumberOfCommentsByAsset(assetId);
}

export async function CallGetUsersById(usersIds: number[]) {
  return contract.getUsersById(usersIds);
}

export async function CallIsUser(addr: string) {
  return contract.isUser(addr);
}

export async function CallGetUserData(addr: string) {
  return contract.getUserData(addr);
}

export async function CallGetUserFromAddr(addr: string) {
  return contract.getUserFromAddr(addr);
}
