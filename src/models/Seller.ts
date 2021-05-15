import { ICreatedBy } from "../common/models/CreatedBy";
import { TimeStamps } from "../common/models/TimeStamps";
import IOffer from "./Offer";
import User from "./User";

export default interface ISeller extends TimeStamps, ICreatedBy<User> {
  _id: string;
  name: string;
  description: string;
  email: string | undefined;
  website: string | undefined;
  phone: string;
  logo: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  createdByUser?: User;
  offers?: IOffer[];
}
