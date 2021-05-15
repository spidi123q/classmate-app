import GeoJSON from "../common/models/GeoJSON";
import IPagination from "../common/models/Pagination";
import { ClaimStatus } from "./enum";
import IProduct from "./Product";

export default interface IClaim {
  _id: string;
  title: string;
  description: string;
  status: ClaimStatus;
  productId: string;
  address: string;
  location: GeoJSON;
  product: IProduct;
  createdAt: Date;
  updatedAt: Date;
}

export type IClaimEdit = Partial<IClaim>;

export type IClaimQuery = IClaimEdit & IPagination;

export const InitialClaimEdit: IClaimEdit = {
  title: "",
  description: "",
  productId: "",
  address: "",
};
