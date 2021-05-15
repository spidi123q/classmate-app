import { AppInfoActionTypes } from "./AppInfoAction";
import { v4 as uuidv4 } from "uuid";

import { AnyAction, Reducer } from "redux";
import {
  AppInfoReducerState,
  InitialAppInfoReducerState,
} from "./AppInfoReducerState";

export const AppInfoReducer: Reducer<any> = (
  state: AppInfoReducerState = InitialAppInfoReducerState,
  action: AnyAction
) => {
  switch (action.type) {
    case AppInfoActionTypes.InApiProgress:
      return { ...state, isLoading: true };
    case AppInfoActionTypes.OnApiFail:
      return {
        ...state,
        isLoading: false,
        lastApiError: { message: action.payload, id: uuidv4() },
      };
    case AppInfoActionTypes.OnApiSuccess:
      return { ...state, isLoading: false };
    case AppInfoActionTypes.AppReady:
      return { ...state, appReady: true };
    case AppInfoActionTypes.SetScrollDirection:
      return { ...state, scrollDirection: action.payload };
    case AppInfoActionTypes.SetRecentSearch:
      return { ...state, recentSearch: action.payload };
    case AppInfoActionTypes.GetNotificationOnSuccess:
      return { ...state, notifications: action.payload };
    case AppInfoActionTypes.SetFirstLaunch:
      return { ...state, isFirstLaunch: action.payload };
    default:
      return state;
  }
};
