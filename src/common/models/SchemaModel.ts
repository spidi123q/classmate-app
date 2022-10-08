import IUser from "../../models/User";
import { ICreatedBy } from "./CreatedBy";
import { ITimeStamps } from "./TimeStamps";
import { IUpdatedBy } from "./UpdatedBy";

export interface ISchemaModel
  extends ITimeStamps,
    ICreatedBy<IUser>,
    IUpdatedBy {
  _id: string;
}
