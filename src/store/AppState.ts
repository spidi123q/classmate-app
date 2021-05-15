import { AppInfoReducerState } from "../common/state/AppInfoReducerState";
import { LoginReducerState } from "../features/login/state/LoginReducerState";
import { ProductReducerState } from "../features/product/state/ProductReducerState";

export default interface AppState {
  appInfo: AppInfoReducerState;
  login: LoginReducerState;
  product: ProductReducerState;
}
