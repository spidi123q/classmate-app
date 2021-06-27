import { UserPermissions, UserRoles } from "./enum";
import GeoJSON from "../common/models/GeoJSON";
import { IClassroom } from "./Classroom";
import IOrganization from "./Organization";
import { ITimeStamps } from "../common/models/TimeStamps";

export default interface IUser extends Partial<ITimeStamps> {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: string;
  firebaseId: string;
  avatarURL?: string;
  dob?: Date;
  location?: GeoJSON;
  address?: string;
  distance?: number;
  username?: string;
  password?: string;
  classroomId?: string;
  classroom?: IClassroom;
  organizationId?: string;
  organization?: IOrganization;
  permissions: UserPermissions[];
  active?: boolean;
}

export interface IUserEdit extends Partial<IUser> {
  password?: string;
}

export interface IUserQuery extends Partial<IUser> {
  page?: number;
}

export const InitialUser: IUser = {
  _id: "",
  role: UserRoles.Guest,
  firebaseId: "",
  permissions: [],
};

export const InitialUserEdit: IUserEdit = {
  email: "",
  password: "",
  name: "",
  phone: "",
  organizationId: "",
  role: UserRoles.User,
  active: true,
};
