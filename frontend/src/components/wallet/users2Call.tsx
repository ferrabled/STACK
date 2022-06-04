import { ethers } from "ethers";
import {
  Asset,
  CloudAssetProps,
  DataAssetProps,
  DocAssetProps,
  HardwareAssetProps,
  NetworkAssetProps,
  OtherAssetProps,
  SoftwareAssetProps,
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
export async function CallInsertNewSAssetWithDepartment(
  asset: Asset,
  props: SoftwareAssetProps
) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewSAssetWithDepartment(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      props.version,
      props.provider,
      props.stype,
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
    handleTransactionError(e);
  }
}

export async function CallInsertNewHAssetWithDepartment(
  asset: Asset,
  props: HardwareAssetProps
) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewHAssetWithDepartment(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      props.model,
      props.provider,
      props.serialNumber,
      props.htype,
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
    handleTransactionError(e);
  }
}

export async function CallInsertNewDocAssetWithDepartment(
  asset: Asset,
  props: DocAssetProps
) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewDocAssetWithDepartment(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      props.name,
      props.location,
      props.doctype,
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
    handleTransactionError(e);
  }
}

export async function CallInsertNewDataAssetWithDepartment(
  asset: Asset,
  props: DataAssetProps
) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewDataAssetWithDepartment(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      props.location,
      props.local,
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
    handleTransactionError(e);
  }
}

export async function CallInsertNewNAssetWithDepartment(
  asset: Asset,
  props: NetworkAssetProps
) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewNAssetWithDepartment(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      props.cidrblock,
      props.nat,
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
    handleTransactionError(e);
  }
}

export async function CallInsertNewCAssetWithDepartment(
  asset: Asset,
  props: CloudAssetProps
) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewCAssetWithDepartment(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      props.url,
      props.domain,
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
    handleTransactionError(e);
  }
}

export async function CallInsertNewOAssetWithDepartment(
  asset: Asset,
  props: OtherAssetProps
) {
  try {
    const signerAddress = await provider.getSigner().getAddress();
    await contract2.insertNewOAssetWithDepartment(
      asset.name,
      asset.orgId,
      asset.adquireDate,
      asset.creationDate,
      asset.assetType,
      asset.assetDepart,
      props.description,
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
    handleTransactionError(e);
  }
}
