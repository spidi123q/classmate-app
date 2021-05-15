import INotification from "../models/Notification";
import PaginateResult, {
  InitialPaginateResult,
} from "../models/PaginateResult";
import ToastMessage from "../models/ToastMessage";

export interface AppInfoReducerState {
  appReady: boolean;
  isLoading: boolean;
  lastApiError?: ToastMessage;
  scrollDirection?: IScrollDirection;
  recentSearch: string[];
  notifications: PaginateResult<INotification>;
  isFirstLaunch: boolean;
}

export const InitialAppInfoReducerState: AppInfoReducerState = {
  appReady: false,
  isLoading: false,
  recentSearch: [],
  notifications: InitialPaginateResult,
  isFirstLaunch: true,
};

export type IScrollDirection = "up" | "down" | undefined;
