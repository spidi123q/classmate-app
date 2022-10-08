import IUser from "../../models/User";

export interface IUpdatedBy {
  updatedBy: number;
  updatedByUser?: IUser;
}
