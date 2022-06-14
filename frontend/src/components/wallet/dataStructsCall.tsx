import { ethers } from "ethers";
import {
  CloudAssetProps,
  DataAssetProps,
  DocAssetProps,
  HardwareAssetProps,
  Licence,
  NetworkAssetProps,
  OtherAssetProps,
  SoftwareAssetProps,
} from "types";
import addresses from "../../assets/addresses.json";
import mainABI2 from "./dataStructAbi.json";

const contractAddress2 = addresses.DataStructs;
const provider2 = new ethers.providers.Web3Provider(window.ethereum);
const contract2 = new ethers.Contract(
  contractAddress2,
  mainABI2,
  provider2.getSigner()
);

export async function CallGetSoftwareAsset(assetId: number): Promise<SoftwareAssetProps> {
  const ret = contract2.getSoftwareAsset(assetId);
  return ret;
}

export async function CallGetHardwareAsset(assetId: number): Promise<HardwareAssetProps> {
  return contract2.getHardwareAsset(assetId);
}

export async function CallGetDocAsset(assetId: number): Promise<DocAssetProps> {
  return contract2.getDocAsset(assetId);
}

export async function CallGetDataAsset(assetId: number): Promise<DataAssetProps> {
  return contract2.getDataAsset(assetId);
}

export async function CallGetNetworkAsset(assetId: number): Promise<NetworkAssetProps> {
  return contract2.getNetworkAsset(assetId);
}

export async function CallGetCloudAsset(assetId: number): Promise<CloudAssetProps> {
  return contract2.getCloudAsset(assetId);
}

export async function CallGetOtherAsset(assetId: number): Promise<OtherAssetProps> {
  return contract2.getOtherAsset(assetId);
}

export async function CallInsertLicenseToSoft(
  license: Licence,
  assetId: number
) {
  try {
    await contract2.insertLicenseToSoft(
      license.name,
      license.key,
      license.adquireDate,
      license.expirationDate,
      license.licenseType,
      assetId
    );
    const correctText = "Licencia añadida correctamente.";

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

export async function CallGetLicenseByAsset(assetId: number) {
  return contract2.getLicenseByAsset(assetId);
}

export async function CallUpdateSoftwareAsset(
  data: SoftwareAssetProps,
  assetId: number
) {
  try {
    await contract2.updateSoftwareAsset(
      data.version,
      data.provider,
      data.stype,
      assetId
    );
    const correctText = "Tipo del Activo editado correctamente.";

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

export async function CallUpdateHardwareAsset(
  data: HardwareAssetProps,
  assetId: number
) {
  try {
    await contract2.updateHardwareAsset(
      data.model,
      data.provider,
      data.serialNumber,
      data.htype,
      assetId
    );
    const correctText = "Tipo del Activo editado correctamente.";

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

export async function CallUpdateDocAsset(data: DocAssetProps, assetId: number) {
  try {
    await contract2.updateDocAsset(
      data.name,
      data.location,
      data.doctype,
      assetId
    );
    const correctText = "Tipo del Activo editado correctamente.";

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

export async function CallUpdateDataAsset(
  data: DataAssetProps,
  assetId: number
) {
  try {
    await contract2.updateDataAsset(data.location, data.local, assetId);
    const correctText = "Tipo del Activo editado correctamente.";

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

export async function CallUpdateNetworkAsset(
  data: NetworkAssetProps,
  assetId: number
) {
  try {
    await contract2.updateNetworkAsset(data.cidrblock, data.nat, assetId);
    const correctText = "Tipo del Activo editado correctamente.";

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

export async function CallUpdateCloudAsset(
  data: CloudAssetProps,
  assetId: number
) {
  try {
    await contract2.updateCloudAsset(data.url, data.domain, assetId);
    const correctText = "Tipo del Activo editado correctamente.";

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

export async function CallUpdateOtherAsset(
  data: OtherAssetProps,
  assetId: number
) {
  try {
    await contract2.updateOtherAsset(data.description, assetId);
    const correctText = "Tipo del Activo editado correctamente.";

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
