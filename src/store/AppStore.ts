import thunk from "redux-thunk";
import axiosMiddleware from "redux-axios-middleware";
import { createStore, applyMiddleware } from "redux";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import { logger } from "redux-logger";

import { RootReducer } from "./RootReducer";
import { client } from "../common/helpers/axios";
import { axiosMiddlewareConfig } from "../common/config/axiosMiddlewareConfig";
import Initialize from "./AppInit";
import AppState from "./AppState";
import AsyncLocalStorage from "../common/native/asyncLocalStorage";

const persistConfig: PersistConfig<AppState, any, any, any> = {
  key: "root",
  storage: AsyncLocalStorage,
  whitelist: ["login", "video"],
};

const configureStore = () => {
  const persistedReducer = persistReducer(persistConfig, RootReducer());
  const appStore = createStore(
    persistedReducer,
    applyMiddleware(
      thunk,
      //logger,
      axiosMiddleware(client, axiosMiddlewareConfig)
    )
  );
  Initialize(appStore.dispatch);
  return appStore;
};

export const store = configureStore();
export const persistor = persistStore(store);
