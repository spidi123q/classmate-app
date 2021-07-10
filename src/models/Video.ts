import ICustomBlobUploadCommonResponse from "../common/models/azure/CustomBlobUploadCommonResponse";
import ICustomJobsCreateResponse from "../common/models/azure/CustomJobsCreateResponse";
import ICustomStreamingPath from "../common/models/azure/CustomStreamingPath";
import { ITimeStamps } from "../common/models/TimeStamps";
import { IClassroom } from "./Classroom";
import IOrganization from "./Organization";

export default interface IVideo extends ITimeStamps {
  _id: string;
  name: string;
  description: string;
  videoAzureBlob: ICustomBlobUploadCommonResponse;
  coverImageAzureBlob: ICustomBlobUploadCommonResponse;
  encodingAzureJob: ICustomJobsCreateResponse;
  streamingLocatorAzure?: ICustomStreamingPath[];
  active: boolean;
  category: string;
  organizationId: string;
  classroomId: string;
  order: number | null;
  organization?: IOrganization;
  classroom?: IClassroom;
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
