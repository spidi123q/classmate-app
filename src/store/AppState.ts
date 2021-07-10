import { IAppInfoReducerState } from "../common/state/AppInfoReducerState";
import { ILoginReducerState } from "../features/login/state/LoginReducerState";
import { IVideoReducerState } from "../features/videos/state/VideoReducerState";

export default interface AppState {
  appInfo: IAppInfoReducerState;
  login: ILoginReducerState;
  video: IVideoReducerState;
}
