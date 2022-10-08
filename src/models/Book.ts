import IDocumetResponse from "../common/models/DocumetResponse";
import { ISchemaModel } from "../common/models/SchemaModel";
import { IClassroom } from "./Classroom";
import IOrganization from "./Organization";

export interface IBook extends ISchemaModel {
  name: string;
  organizationId: string;
  classroomId: string;
  mainCategory: string;
  subCategory: string;
  active: boolean;
  organization?: IOrganization;
  classroom?: IClassroom;
  document: IDocumetResponse;
}

export interface IBookEdit extends Partial<IBook> {}

export interface IBookQuery extends Partial<IBook> {
  page?: number;
  fieldsToPopulate?: string;
  pagination?: boolean;
}

export const InitialBookEdit: IBookEdit = {
  name: "",
  organizationId: "",
  classroomId: "",
  mainCategory: "",
  subCategory: "",
  active: true,
};
