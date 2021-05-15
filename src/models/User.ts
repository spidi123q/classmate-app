import { UserPermissions, UserRoles } from "./enum";
import GeoJSON from "../common/models/GeoJSON";

export default interface User {
  _id: string;
  role: UserRoles;
  firebaseId: string;
  dob?: Date;
  name?: string;
  phone?: string;
  location?: GeoJSON;
  address?: string;
  email?: string;
  avatarURL?: string;
  permissions: UserPermissions[];
}

export const InitialUser: User = {
  _id: "",
  role: UserRoles.Guest,
  firebaseId: "",
  name: "",
  permissions: [],
};

export type UserEdit = Partial<User>;
