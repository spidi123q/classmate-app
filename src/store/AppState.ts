import { AppInfoReducerState } from "../common/state/AppInfoReducerState";
import { LoginReducerState } from "../features/login/state/LoginReducerState";

export default interface AppState {
  appInfo: AppInfoReducerState;
  login: LoginReducerState;
}
