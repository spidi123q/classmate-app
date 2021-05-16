import { combineReducers, Reducer } from "redux";
import AppState from "./AppState";
import { AppInfoReducer } from "../common/state/AppInfoReducer";
import { LoginReducer } from "../features/login/state/reducer";
import { ProductReducer } from "../features/product/state/reducer";
import FilesystemStorage from "redux-persist-filesystem-storage";
import { persistReducer } from "redux-persist";

const appInfoPersistConfig = {
  key: "appInfo",
  storage: FilesystemStorage,
  whitelist: ["recentSearch", "isFirstLaunch"],
};

export const RootReducer = (): Reducer<AppState> =>
  combineReducers({
    appInfo: persistReducer(appInfoPersistConfig, AppInfoReducer),
    login: LoginReducer,
    product: ProductReducer,
  });
