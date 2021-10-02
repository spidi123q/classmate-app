import { ITimeStamps } from "../common/models/TimeStamps";
import { IClassroom } from "./Classroom";
import IOrganization from "./Organization";

export default interface IVideo extends ITimeStamps {
  _id: string;
  name: string;
  description: string;
  active: boolean;
  category: string;
  organizationId: string;
  classroomId: string;
  order: number;
  organization?: IOrganization;
  classroom?: IClassroom;
  cloudflareStreamVideoId: string;
  coverImageUrl: string;
}

export interface IVideoEdit extends Partial<IVideo> {}

export interface IVideoQuery extends IVideoEdit {
  page?: number;
  pagination?: boolean;
}

export const InitialVideoEdit: IVideoEdit = {
  name: "",
  description: "",
  organizationId: "",
  classroomId: "",
  category: "",
  order: 0,
  active: false,
};
