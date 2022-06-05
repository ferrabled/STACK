import { ethers } from "ethers";
import {
  Admin,
  Asset,
  AssetEdited,
  CloudAsset,
  DataAsset,
  DocAsset,
  HardwareAsset,
  NetworkAsset,
  Notify,
  Organization,
  OrganizationAndAdmin,
  OtherAsset,
  SoftwareAsset,
  TransactionError,
} from "types";
import addresses from "../../assets/addresses.json";
import mainABI from "./mainABI.json";

const contractAddress = addresses.Main;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
  contractAddress,
  mainABI,
  provider.getSigner()
);

export async function CallInsertOrg(input: OrganizationAndAdmin): Promise<Notify> {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  console.log(input);

  try {
    await contract.insertOrgAndAdmin(
      signerAddress,
      input.firstName,
      input.lastName,
      input.email,
      input.telephoneAdmin,
      input.organizationName,
      input.address,
      input.telephoneOrganization
    );
    const text =
      "Organización creada correctamente. Guardando datos en la Blockchain...";
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
        const errorM =
          "Ya existe un administrador con esta billetera, por favor, elige otra";
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
        };
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

export async function WaitForInsertOrg(data: OrganizationAndAdmin) {
  //const navigate = useNavigate()

  const handleNewOrg = (address: string, orgName: string) => {
    console.log("Registro");
    console.log(address, orgName);
    console.log(data);
    provider
      .getSigner()
      .getAddress()
      .then((myaddress) => {
        if (data.organizationName === orgName && address == myaddress) {
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

export async function CallIsAdministrator(address: string): Promise<boolean> {
  console.log("Is administrator " + address);
  const isAdmin: boolean = contract.isAdministrator(address);
  return isAdmin;
}

export async function CallGetAdminToOrg(address: string): Promise<number> {
  const orgId = contract.getAdminToOrg(address);
  return orgId;
}

export async function CallInsertNewSoftAsset(
  asset: SoftwareAsset
): Promise<Notify> {
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

export async function CallInsertNewHardAsset(
  asset: HardwareAsset
): Promise<Notify> {
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

export async function CallInsertNewDocAsset(asset: DocAsset): Promise<Notify> {
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

export async function CallInsertNewDataAsset(
  asset: DataAsset
): Promise<Notify> {
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

export async function CallInsertNewNetworkAsset(
  asset: NetworkAsset
): Promise<Notify> {
  try {
    await contract.insertNewNetworkAsset(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.cidrblock,
      asset.nat
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

export async function CallInsertNewCloudAsset(
  asset: CloudAsset
): Promise<Notify> {
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

/**
 * Ejemplo de como user el Promise.catch() en formTypes.tsx
 * @param asset
 */
export async function CallInsertNewOtherAsset(
  asset: OtherAsset
): Promise<void> {
  await contract.insertNewOtherAsset(
    asset.name,
    asset.orgId,
    asset.adquireDate,
    asset.creationDate,
    asset.assetType,
    asset.assetDepart,
    asset.description
  );
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

export async function CallGetOrganizationAssets(
  props: number
): Promise<Asset[]> {
  const contract = new ethers.Contract(
    contractAddress,
    mainABI,
    provider.getSigner()
  );
  const assets = contract.getAllAssetsFromOrg(props);
  return assets;
}

export async function CallGetAsset(props: number): Promise<Asset> {
  const contract = new ethers.Contract(
    contractAddress,
    mainABI,
    provider.getSigner()
  );

  const asset = contract.getAsset(props);
  return asset;
}

export async function CallGetOrganizationData(
  props: number
): Promise<Organization> {
  const organization = contract.getOrg(props);
  return organization;
}

export async function CallGetAdminData(props: number): Promise<Admin> {
  const admin = contract.getAdmin(props);
  return admin;
}

export async function CallInsertEditedAsset(
  props: AssetEdited
): Promise<Notify> {
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
          Number(response.orgId),
          Number(response.adquireDate),
          Number(response.creationDate),
          true,
          String(response.assetType)
        );
      });
    }
  });
}

export function CallGetIsAssetDeleted(assetId: number): Promise<boolean> {
  return contract.getIsAssetDeleted(assetId);
}

export function CallGetIsAssetEdited(assetId: number): Promise<boolean> {
  return contract.getIsAssetEdited(assetId);
}

export function CallGetLastAssetEdited(assetId: number): Promise<AssetEdited> {
  return contract.getLastAssetEdited(assetId);
}

export function CallGetAssetEdited(
  assetEditedId: number
): Promise<AssetEdited> {
  return contract.getAssetEdited(assetEditedId);
}

export function CallGetRecordList(
  assetId: number
): Promise<[Asset, AssetEdited[]]> {
  return contract.getRecordList(assetId);
}

//Org id and get all assets deleted
export function CallGetAssetsDeleted(orgId: number): Promise<AssetEdited[]> {
  return contract.getAssetsDeleted(orgId);
}

/**
 * [Lista de assets, lista de assets editados]
 * @param ids
 * @returns
 */
export function CallRetrieveListOfAsset(
  ids: number[]
): Promise<[Asset[], AssetEdited[]]> {
  return contract.retrieveListOfAsset(ids);
}

/**
 * [numero assets org, numero assets editados de la organizacion, numero assets eliminados de la organizacion]
 */
export function CallRetrieveOrgData(props: number): Promise<number[]> {
  return contract.retrieveOrgData(props);
}
