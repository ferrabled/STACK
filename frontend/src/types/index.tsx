export type AdminFormValues = {
  name: string;
  surname: string;
  email: string;
  checkemail: boolean;
  telephone?: number;
};

export type OrganizationFormValues = {
  nameO: string;
  address: string;
  telephoneO?: number;
};

export type AssetsList = {
  asset: string;
  creationDate: Date;
  type: string;
  department?: string;
};

export type Organization = {
  name: string;
  address: string;
  telephone: number;
};

export type BlockchainOrganization = {
  name: string;
  addressO: string;
  telephone: number;
}

export type OrganizationAndAdmin = {
  firstName: string;
  lastName: string;
  email: string;
  telephoneAdmin: string;
  organizationName: string;
  address: string;
  telephoneOrganization: string;
};

export type Admin = {
  name: string;
  lastName: string;
  address: string;
  email: string;
  telephone: number;
};

export type BlockchainAdmin = {
  name: string;
  lastname: string;
  admin: string;
  email: string;
  telephone: number;
  index: number;
}

//ASSETS:

export type Asset = {
  name: string;
  organizationId: number;
  assetType: number;
  assetDepart: number;
  creationDate: number;
  adquireDate: number;
  index?: number;
};


export type InputAssetEdited = {
  name: string;
  adquireDate: number|Date;
  creationDate: number|Date;
  assetType: number;
  originalAssetId: number;
  organizationId: number;
  deleted: boolean;
};
export type AssetEdited = InputAssetEdited & {
  index: number;
}

//ADD DEPARTMENT ID FOR EACH
export type AssetsInList = {
  name: string;
  adquireDate: number;
  creationDate: number;
  assetType: number;
  assetTS?: string;
  assetDepart?: number;
  assetDS?: string;
  originalId: number;
  //Id shown in the list
  id?: number;
  //Index from list
  //on the blockchain
  index: number;
  comments?: number;
  organizationId?: number;
};

export const AssetTypes = [
  "Software",
  "Hardware",
  "Documento",
  "Datos",
  "Red",
  "Nube",
  "No determinado",
];
export const SoftwareTypes = [
  "Sistema Operativo",
  "Firmware",
  "Antivirus",
  "Aplicación Móvil",
  "Código",
  "No determinado",
];
export const HardwareTypes = [
  "Ordenador",
  "Smartphone",
  "Periférico",
  "Servidor",
  "Sensor",
  "Actuador",
  "Equipo de Red",
  "No determinado",
];
export const DocTypes = ["Contrato", "Factura", "No determinado"];

export type Notify = {
  isOpen: boolean;
  message: string;
  type: string;
};

export type Department = {
  name: string;
  description: string;
  telephone: string;
  orgId: number;
  index?: number;
  id?: number;
};

export type Comment = {
  description: string;
  userId: number;
  date: number;
  id?: number;
};

export type CommentInTable = {
  description: string;
  userId: number;
  date: number;
  id?: number;
  fullName: string;
  email: string;
  telephone: number;
};

export type Licence = {
  name: string;
  key: string;
  adquireDate: number;
  expirationDate: number;
  adquireDatestring?: string;
  expirationDatestring?: string;
  licenseType: string;
  id?: number;
};

export const LicenceTypes = ["Libre", "Comercial", "De prueba"];

export type SearchObject = {
  name?: string;
  adquireDateI?: number;
  adquireDateF?: number;
  creationDateI?: number;
  creationDateF?: number;
  assetType?: number;
  department?: number;
};

export type TransactionError = {
  data: {
    message: string;
  };
};

export type SoftwareAssetProps = {
  version: string;
  provider: string;
  stype: number;
};

export type HardwareAssetProps = {
  model: string;
  provider: string;
  serialNumber: string;
  htype: number;
};

export type DocAssetProps = {
  name: string;
  location: string;
  doctype: number;
};

export type DataAssetProps = {
  location: string;
  local: boolean;
};

export type NetworkAssetProps = {
  cidrblock: string;
  nat: boolean;
};

export type CloudAssetProps = {
  url: string;
  domain: string;
};

export type OtherAssetProps = {
  description: string;
};

export interface User {
  name: string;
  surname: string;
  email: string;
  telephone: string;
  orgId: number;
}

export interface TableUser extends User {
  addr: string;
  index: number;
}

export type SoftwareAsset = Asset & SoftwareAssetProps;
export type HardwareAsset = Asset & HardwareAssetProps;
export type DocAsset = Asset & DocAssetProps;
export type DataAsset = Asset & DataAssetProps;
export type NetworkAsset = Asset & NetworkAssetProps;
export type CloudAsset = Asset & CloudAssetProps;
export type OtherAsset = Asset & OtherAssetProps;

export type GridTableElement<T> = T & {
  id: number;
};
