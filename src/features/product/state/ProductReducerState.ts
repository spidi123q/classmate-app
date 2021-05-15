import KeyValuePair from "../../../common/models/KeyValuePair";
import PaginateResult, {
  InitialPaginateResult,
} from "../../../common/models/PaginateResult";
import IProduct from "../../../models/Product";

export interface ProductReducerState {
  products: PaginateResult<IProduct>;
  isLoadingProduct: boolean;
}

export const InitialProductReducerState: ProductReducerState = {
  products: InitialPaginateResult,
  isLoadingProduct: true,
};
