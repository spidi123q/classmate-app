import { ITimeStamps } from "../common/models/TimeStamps";

export default interface IOrganization extends ITimeStamps {
  _id: string;
  name: string;
  address: string;
  city: string;
  email: string;
  phone: string;
  caption: string;
  profileImageId: string;
  profileThumbUrl: string;
  website?: string;
  youtube?: string;
  instagram?: string;
  youtubeCount?: number;
  instagramCount?: number;
  youtubeCountFormated?: string;
  instagramCountFormated?: string;
  price: number;
  active: boolean;
}

export interface IOrganizationEdit extends Partial<IOrganization> {}

export interface IOrganizationQuery extends Partial<IOrganization> {
  page: number;
}
export const InitialOrganizationEdit: IOrganizationEdit = {
  name: "",
  city: "",
  email: "",
  phone: "",
  active: true,
};
