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

export type Admin = {
  name: string;
  lastName: string;
  address: string;
  email: string;
  telephone: number;
};

//ASSETS:

export type Asset = {
  name: string;
  //TODO ORG ID CHECK EVERYWHERE
  orgId: number;
  assetType: number;
  assetDepart: number;
  creationDate: number;
  adquireDate: number;
  index?: number;
};

export type AssetEdited = {
  name: string;
  adquireDate?: Date;
  creationDate?: Date;
  assetType?: string;
  originalAssetId: number;
};

//ADD DEPARTMENT ID FOR EACH
export type AssetsInList = {
  name: string;
  adquireDate?: number;
  creationDate?: number;
  assetType: number;
  assetTS?: string;
  assetDepart: number;
  assetDS?: string;
  originalId: number;
  //Id shown in the list
  id?: number;
  //Index from list
  //on the blockchain
  index: number;
  comments?: number;
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

export type Users = {
  addr: string;
  name: string;
  surname: string;
  email: string;
  telephone: number;
  orgId: number;
  index?: number;
  id?: number;
};

export type Notify = {
  isOpen: boolean;
  message: string;
  type: string;
};

export type Department = {
  name: string;
  description: string;
  telephone: number;
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
