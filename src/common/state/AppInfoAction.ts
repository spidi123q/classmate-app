import { createAction } from "redux-actions";
import { IScrollDirection } from "./AppInfoReducerState";
export enum AppInfoActionTypes {
  AppReady = "@@UI/AppReady",
  InApiProgress = "@@UI/api/InProgress",
  OnApiSuccess = "@@UI/api/OnSuccess",
  OnApiFail = "@@UI/api/OnFail",
  DefaultApiCall = "@@UI/api/DefaultApiCall",
  SetScrollDirection = "@@UI/SetScrollDirection",
  SetRecentSearch = "@@UI/SetRecentSearch",
  GetNotificationOnSuccess = "@@UI/GetNotificationOnSuccess",
  GetNotification = "@@UI/GetNotification",
  SetFirstLaunch = "@@UI/SetFirstLaunch",
}

export const AppInfoActions = {
  InApiProgress: createAction(AppInfoActionTypes.InApiProgress),
  OnApiSuccess: createAction(AppInfoActionTypes.OnApiSuccess),
  OnApiFail: createAction(AppInfoActionTypes.OnApiFail),
  AppReady: createAction(AppInfoActionTypes.AppReady),
  SetScrollDirection: createAction(
    AppInfoActionTypes.SetScrollDirection,
    (direction: IScrollDirection) => direction
  ),
  SetRecentSearch: createAction(
    AppInfoActionTypes.SetRecentSearch,
    (searches: string[]) => searches
  ),
  SetFirstLaunch: createAction(
    AppInfoActionTypes.SetFirstLaunch,
    (value: boolean) => value
  ),
};
