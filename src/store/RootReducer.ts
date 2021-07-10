import { combineReducers, Reducer } from "redux";
import AppState from "./AppState";
import { AppInfoReducer } from "../common/state/AppInfoReducer";
import { LoginReducer } from "../features/login/state/reducer";
import { persistReducer } from "redux-persist";
import AsyncLocalStorage from "../common/native/asyncLocalStorage";
import { VideoReducer } from "../features/videos/state/reducer";

const appInfoPersistConfig = {
  key: "appInfo",
  storage: AsyncLocalStorage,
  whitelist: ["recentSearch", "isFirstLaunch"],
};

export const RootReducer = (): Reducer<AppState> =>
  combineReducers({
    appInfo: persistReducer(appInfoPersistConfig, AppInfoReducer),
    login: LoginReducer,
    video: VideoReducer,
  });
