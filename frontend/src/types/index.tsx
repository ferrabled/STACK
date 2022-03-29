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