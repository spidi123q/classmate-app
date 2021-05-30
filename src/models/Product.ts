import { ICreatedBy } from "../common/models/CreatedBy";
import { GeoJSONType } from "../common/models/enum";
import GeoJSON from "../common/models/GeoJSON";
import IPagination from "../common/models/Pagination";
import { TimeStamps } from "../common/models/TimeStamps";
import SystemConfig from "../SystemConfig";
import IBrand from "./Brand";
import ISeller from "./Seller";
import User from "./User";

export default interface IProduct extends TimeStamps, ICreatedBy<User> {
  _id: string;
  name: string;
  billingAddress: string;
  currency: string;
  price: number;
  warrentyPeriodInMonths: number;
  purchasedAt: Date;
  expiresAt: Date;
  coverImage: string;
  brandId: string;
  templateId: number;
  sellerId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  createdByUser?: User;
  brand: IBrand;
  seller: ISeller;
  template: any;
}

export interface IProductQuery extends IProduct, IPagination {
  q?: string;
}
