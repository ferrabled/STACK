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

export type AssetsInList = {
  name: string;
  adquireDate?: Number;
  creationDate?: Number;
  assetType?: string;
  originalId:number;
  //Id shown in the list
  id?:number;
  //Index from list 
  //on the blockchain
  index:number;
}