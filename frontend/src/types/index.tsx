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
}

export type Organization = {
    name: string,
    address: string,
    telephone: Number
}

export type Admin = {
  name: string,
  lastName: string,
  address: string,
  email: string,
  telephone: Number
}


//ASSETS:

export type Asset = {
  name: string;
  //TODO ORG ID CHECK EVERYWHERE
  orgId: number;
  assetType: number;
  assetDepart:number;
  creationDate: number;
  adquireDate: number;
  index?: number;
};

export type AssetEdited = {
  name: string;
  adquireDate?: Date;
  creationDate?: Date;
  assetType?: string;
  originalAssetId:number;
};


//ADD DEPARTMENT ID FOR EACH
export type AssetsInList = {
  name: string;
  adquireDate?: Number;
  creationDate?: Number;
  assetType: string;
  assetTS?:String;
  assetDepart: string;
  assetDS?: string;
  originalId:number;
  //Id shown in the list
  id?:number;
  //Index from list 
  //on the blockchain
  index:number;
}

export const AssetTypes = ["Software", "Hardware", "Documento", "Datos", "Red", "Nube", "No determinado"];
export const SoftwareTypes = ["Sistema Operativo", "Firmware", "Antivirus", "Aplicación Móvil", "Código", "No determinado"];
export const HardwareTypes = ["Ordenador", "Smartphone", "Periférico", "Servidor", "Sensor", "Actuador", "Equipo de Red", "No determinado"];
export const DocTypes = ["Contrato", "Factura", "No determinado"];


export type Users = {
  addr: String;
  name: String;
  surname: String;
  email: String; 
  telephone: Number;
  orgId: Number;
  index?: Number;
  id?: Number;
}

export type Notify = {
  isOpen: Boolean;
  message: String;
  type: String;
}

export type Department = {
  name: String;
  description: String;
  telephone: Number;
  orgId: Number;
  index?: Number;
  id?: Number;
}