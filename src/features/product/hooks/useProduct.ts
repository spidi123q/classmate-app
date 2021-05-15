import _ from "lodash";
import User from "../../../models/User";
import { useSelector } from "react-redux";
import AppState from "../../../store/AppState";
import { ProductReducerState } from "../state/ProductReducerState";

type IKeys = keyof ProductReducerState;

/**
 * Get product state
 */
export default function useProduct() {
  const product = useSelector((state: AppState) => state.product);
  return product;
}
