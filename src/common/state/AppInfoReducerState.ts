import INotification from "../models/Notification";
import {
  InitialPaginateResult,
  PaginateResult,
} from "../models/PaginateResult";
import ToastMessage from "../models/ToastMessage";

export interface IAppInfoReducerState {
  appReady: boolean;
  isLoading: boolean;
  lastApiError?: ToastMessage;
  scrollDirection?: IScrollDirection;
  recentSearch: string[];
  notifications: PaginateResult<INotification>;
  isFirstLaunch: boolean;
  isValidVersion: boolean;
}

export const InitialAppInfoReducerState: IAppInfoReducerState = {
  appReady: false,
  isLoading: false,
  recentSearch: [],
  notifications: InitialPaginateResult,
  isFirstLaunch: true,
  isValidVersion: true,
};

export type IScrollDirection = "up" | "down" | undefined;
