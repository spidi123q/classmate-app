import { ProductActionTypes } from "./action";
import { AnyAction, Reducer } from "redux";
import {
  InitialProductReducerState,
  ProductReducerState,
} from "./ProductReducerState";

export const ProductReducer: Reducer<ProductReducerState> = (
  state: ProductReducerState = InitialProductReducerState,
  action: AnyAction
) => {
  switch (action.type) {
    case ProductActionTypes.GetProductsOnSuccess:
      return { ...state, products: action.payload, isLoadingProduct: false };
    case ProductActionTypes.GetProductsOnFail:
      return { ...state, isLoadingProduct: false };
    default:
      return state;
  }
};
