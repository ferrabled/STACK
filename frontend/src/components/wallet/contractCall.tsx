import { ethers } from "ethers";
import { Asset, CloudAsset, DataAsset, DocAsset, HardwareAsset, NetworkAsset, OtherAsset, SoftwareAsset } from "types";
import addresses from "../../assets/addresses.json";
import mainABI from "./mainABI.json";



const contractAddress = addresses.Main;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
  contractAddress,
  mainABI,
  provider.getSigner()
);

export async function CallInsertOrg(input: any) {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  console.log(input);

  try {
    await contract.insertOrgAndAdmin(
      signerAddress,
      input.firstName,
      input.lastName,
      input.email,
      input.telephoneA,
      input.orgName,
      input.address,
      input.telephoneOrg
    );
    const text =
      "Organización creada correctamente. Guardando datos en la Blockchain...";
    const notify = {
      isOpen: true,
      message: text,
      type: "success",
    };
    return notify;
  } catch (e: any) {
    try {
      if (e.data.message.includes("revert")) {
        console.log(e.data.message);
        const errorM =
          "Ya existe un administrador con esta billetera, por favor, elige otra";
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

export async function WaitForInsertOrg(data: any) {
  //const navigate = useNavigate()

  const handleNewOrg = (address: any, orgName: string) => {
    console.log("Registro");
    console.log(address, orgName);
    console.log(data);
    provider
      .getSigner()
      .getAddress()
      .then((myaddress) => {
        if (data === orgName && address == myaddress) {
          console.log("Registro nuevo");
          window.localStorage.setItem("userAddress", address);
          window.localStorage.setItem("isAdmin", "true");
          CallGetAdminToOrg(myaddress).then((r) => {
            window.localStorage.setItem("orgId", String(r));
            window.location.replace("/home");
          });
        }
        return () => {
          contract.removeAllListeners("NewOrg");
        };
      });
  };

  console.log("Listening to the blockchain");
  contract.on("NewOrg", (address, orgName) => handleNewOrg(address, orgName));
}

export async function CallIsAdministrator(props: any) {
  console.log("Is administrator " + props);
  const isAdmin: boolean = contract.isAdministrator(props);
  return isAdmin;
}

export async function CallGetAdminToOrg(props: any) {
  const orgId = contract.getAdminToOrg(props);
  return orgId;
}

export async function CallInsertNewSoftAsset(asset: SoftwareAsset) {
  try {
    await contract.insertNewSoftAsset(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.version,
      asset.provider,
      asset.stype
    );
    const correctText = "Activo creado correctamente";

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

export async function CallInsertNewHardAsset(asset: HardwareAsset) {
  try {
    await contract.insertNewHardAsset(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.model,
      asset.provider,
      asset.serialNumber,
      asset.htype
    );
    const correctText = "Activo creado correctamente";

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

export async function CallInsertNewDocAsset(asset: DocAsset) {
  console.log("Insertar doc");
  try {
    await contract.insertNewDocAsset(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.name,
      asset.location,
      asset.doctype
    );
    const correctText = "Activo creado correctamente";

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

export async function CallInsertNewDataAsset(asset: DataAsset) {
  try {
    await contract.insertNewDataAsset(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.location,
      asset.local
    );
    const correctText = "Activo creado correctamente";

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

export async function CallInsertNewNetworkAsset(asset: NetworkAsset) {
  try {
    await contract.insertNewNetworkAsset(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.cidrblock,
      asset.nat,
    );
    const correctText = "Activo creado correctamente";

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

export async function CallInsertNewCloudAsset(asset: CloudAsset) {
  try {
    await contract.insertNewCloudAsset(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.url,
      asset.domain
    );
    const correctText = "Activo creado correctamente";

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

export async function CallInsertNewOtherAsset(asset: OtherAsset) {
  try {
    await contract.insertNewOtherAsset(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.description
    );
    const correctText = "Activo creado correctamente";

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

export async function CallInsertAsset(props: Asset) {
  console.log(props);
  const input = props;
  //const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //const provider = new ethers.providers.Web3Provider(window.ethereum);
  /* const contract = new ethers.Contract(
        contractAddress,
        mainABI,
        provider.getSigner());
     */
  console.log("HOLA");
  //TODO change ORG ID
  input.orgId = 0;

  contract.insertAsset(
    input.name,
    input.orgId,
    input.adquireDate,
    input.creationDate,
    input.assetType
  );
}

export async function CallGetOrganizationAssets(props: number) {
  const contract = new ethers.Contract(
    contractAddress,
    mainABI,
    provider.getSigner()
  );
  const assets = contract.getAllAssetsFromOrg(props);
  return assets;
}

export async function CallGetAsset(props: number) {
  const contract = new ethers.Contract(
    contractAddress,
    mainABI,
    provider.getSigner()
  );

  const asset = contract.getAsset(props);
  return asset;
}

export async function CallGetOrganizationData(props: number) {
  const organization = contract.getOrg(props);
  return organization;
}

export async function CallGetAdminData(props: number) {
  const admin = contract.getAdmin(props);
  return admin;
}

export async function CallInsertEditedAsset(props: any) {
  const input = props;
  try {
    await contract.insertEditedAsset(
      input.originalAssetId,
      input.name,
      input.organizationId,
      input.adquireDate,
      input.creationDate,
      input.deleted,
      input.assetType
    );
    const correctText = "Activo editado correctamente";

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

export async function CallDeleteAsset(props: number) {
  //This call inserts a new edited asset, but with 'deleted:true'
  //Props is the id of the original asset, so we need
  //to check if it has been edited and retrieve last edited data

  CallGetIsAssetEdited(props).then((response) => {
    //if asset has been edited before
    if (response) {
      CallGetLastAssetEdited(props).then((response) => {
        console.log("Deleting edited asset");

        console.log(response);
        //formatData(response);
        contract.insertEditedAsset(
          Number(response.originalAssetId),
          String(response.name),
          Number(response.organizationId),
          Number(response.adquireDate),
          Number(response.creationDate),
          true,
          String(response.assetType)
        );
      });
    } else {
      CallGetAsset(props).then((response) => {
        console.log("Deleting Original asset");
        console.log(response);
        console.log("Borrar");
        contract.insertEditedAsset(
          Number(response.index),
          String(response.name),
          Number(response.organizationId),
          Number(response.adquireDate),
          Number(response.creationDate),
          true,
          String(response.assetType)
        );
        /* contract.insertEditedAsset(input.originalAssetId, input.name, input.organizationId, input.adquireDate, 
            input.creationDate, input.deleted, input.assetType); */
      });
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

export async function CallGetRecordList(props: number) {
  return contract.getRecordList(props);
}

//Org id and get all assets deleted
export async function CallGetAssetsDeleted(props: number) {
  return contract.getAssetsDeleted(props);
}

export async function CallRetrieveListOfAsset(props: number[]) {
  return contract.retrieveListOfAsset(props);
}

export async function CallRetrieveOrgData(props: number) {
  return contract.retrieveOrgData(props);
}
