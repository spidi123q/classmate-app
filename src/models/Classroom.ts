import IDocumetResponse from "../common/models/DocumetResponse";
import { ITimeStamps } from "../common/models/TimeStamps";
import IOrganization from "./Organization";
export interface IClassroom extends ITimeStamps {
  _id: string;
  name: string;
  organizationId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  organization?: IOrganization;
  userCount?: number;
  categories: string[];
  liveDetails?: ILiveDetails;
  liveUpdateInterval: number;
}

export interface ILiveDetails {
  roomName: string;
  lastSeem: Date;
  isLive: boolean;
}

export interface IClassroomEdit extends Partial<IClassroom> {
  password?: string;
}

export interface IClassroomQuery extends Partial<IClassroom> {
  page?: number;
}

export const InitialClassroomEdit: IClassroomEdit = {
  name: "",
  organizationId: "",
  active: true,
};
