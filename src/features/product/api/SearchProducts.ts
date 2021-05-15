import { IRequest } from "../../../common/helpers/axios";
import { IProductQuery } from "../../../models/Product";

export default function SearchProducts(params: IProductQuery): IRequest {
  const url = "/api/v1/Product/Search/Summary";
  return {
    url,
    params,
  };
}
