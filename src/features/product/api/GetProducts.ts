import { IRequest } from "../../../common/helpers/axios";
import { IProductQuery } from "../../../models/Product";
import { ProductActionTypes } from "../state/action";

const GetProducts = (query?: IProductQuery): IRequest => {
  let url = "/api/v1/Product";
  return {
    url,
    params: query,
    actionType: ProductActionTypes.GetProducts,
  };
};

export default GetProducts;
