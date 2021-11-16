import GeoJSON from "../common/models/GeoJSON";
import { ITimeStamps } from "../common/models/TimeStamps";

export default interface IOrganization extends ITimeStamps {
  _id: string;
  name: string;
  address: string;
  location: GeoJSON;
  city: string;
  email: string;
  phone: string;
  active: boolean;
  website?: string;
  appLogoUrl?: string;
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
