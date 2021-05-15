import { ICreatedBy } from "../common/models/CreatedBy";
import { TimeStamps } from "../common/models/TimeStamps";
import User from "./User";

export default interface IBrand extends TimeStamps, ICreatedBy<User> {
  _id: string;
  name: string;
  description: string;
  logo: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  createdByUser?: User;
}
