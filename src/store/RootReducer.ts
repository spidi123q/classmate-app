import { combineReducers, Reducer } from "redux";
import AppState from "./AppState";
import { AppInfoReducer } from "../common/state/AppInfoReducer";
import { LoginReducer } from "../features/login/state/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const appInfoPersistConfig = {
  key: "appInfo",
  storage: AsyncStorage,
  whitelist: ["recentSearch", "isFirstLaunch"],
};

export const RootReducer = (): Reducer<AppState> =>
  combineReducers({
    appInfo: persistReducer(appInfoPersistConfig, AppInfoReducer),
    login: LoginReducer,
  });
