import {
  JobState,
  JobInputUnion,
  JobOutputUnion,
  Priority,
  SystemData,
} from "./mediaServices";

export default interface ICustomJobsCreateResponse {
  created?: Date;

  state?: JobState;

  description?: string;

  input: JobInputUnion;

  lastModified?: Date;
  outputs: JobOutputUnion[];

  priority?: Priority;

  correlationData?: { [propertyName: string]: string };

  startTime?: Date;

  endTime?: Date;

  systemData?: SystemData;

  id?: string;

  name: string;

  type?: string;
}
