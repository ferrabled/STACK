import { ethers } from "ethers";
import {
  CloudAsset,
  DataAsset,
  DocAsset,
  HardwareAsset,
  NetworkAsset,
  OtherAsset,
  SoftwareAsset,
  TransactionError,
} from "types";
import addresses from "../../assets/addresses.json";
import users2ABI from "./users2.json";

const contractAddress2 = addresses.Users2;
const provider = new ethers.providers.Web3Provider(window.ethereum);

const contract2 = new ethers.Contract(
  contractAddress2,
  users2ABI,
  provider.getSigner()
);

function handleTransactionError(e: TransactionError | unknown) {
  console.log(e);
  if (
    (e as TransactionError).data?.message &&
    (e as TransactionError).data.message.includes(" revert")
  ) {
    const errorM =
      "Este usuario no pertenece a la organización o al departamento elegido";
    const notify = { isOpen: true, message: errorM, type: "error" };
    return notify;
  } else {
    const errorM = "Por favor, acepta la transacción en metamask";
    const notify = { isOpen: true, message: errorM, type: "error" };
    return notify;
  }
}

//NEW ASSETS WITH DEPARTMENT
export async function CallInsertNewSAssetWithDepartment(asset: SoftwareAsset) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewSAssetWithDepartment(
      asset.name,
      asset.organizationId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.version,
      asset.provider,
      asset.stype,
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
    return handleTransactionError(e);
  }
}

export async function CallInsertNewHAssetWithDepartment(asset: HardwareAsset) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewHAssetWithDepartment(
      asset.name,
      asset.organizationId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.model,
      asset.provider,
      asset.serialNumber,
      asset.htype,
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
    return handleTransactionError(e);
  }
}

export async function CallInsertNewDocAssetWithDepartment(asset: DocAsset) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewDocAssetWithDepartment(
      asset.name,
      asset.organizationId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.name,
      asset.location,
      asset.doctype,
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
    return handleTransactionError(e);
  }
}

export async function CallInsertNewDataAssetWithDepartment(asset: DataAsset) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewDataAssetWithDepartment(
      asset.name,
      asset.organizationId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.location,
      asset.local,
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
    return handleTransactionError(e);
  }
}

export async function CallInsertNewNAssetWithDepartment(asset: NetworkAsset) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewNAssetWithDepartment(
      asset.name,
      asset.organizationId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.cidrblock,
      asset.nat,
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
    return handleTransactionError(e);
  }
}

export async function CallInsertNewCAssetWithDepartment(asset: CloudAsset) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewCAssetWithDepartment(
      asset.name,
      asset.organizationId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.url,
      asset.domain,
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
    return handleTransactionError(e);
  }
}

export async function CallInsertNewOAssetWithDepartment(asset: OtherAsset) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewOAssetWithDepartment(
      asset.name,
      asset.organizationId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      asset.description,
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
    return handleTransactionError(e);
  }
}
