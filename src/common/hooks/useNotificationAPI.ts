import { useDispatch } from "react-redux";
import DeleteNotifications from "../api/DeleteNotifications";
import GetNotification from "../api/GetNotifications";
import PatchNotificationsAsSeen from "../api/PatchNotificationsAsSeen";
import { AxiosApi, IResponse } from "../helpers/axios";
import INotification, { INotificationQuery } from "../models/Notification";
import IPaginatedRequest from "../models/PaginatedRequest";
import { PaginateResult } from "../models/PaginateResult";

export default function useNotificationAPI() {
  const dispatch: any = useDispatch();

  const getNotifications = async (
    params?: INotificationQuery,
    stateUpdate?: boolean | undefined
  ): Promise<any> => {
    const request = GetNotification(params, stateUpdate);
    return dispatch(AxiosApi(request));
  };

  const seenNotifications = async () => {
    const request = PatchNotificationsAsSeen();
    return dispatch(AxiosApi(request));
  };

  const deleteNotifications = async () => {
    const request = DeleteNotifications();
    return dispatch(AxiosApi(request));
  };

  const seenAndUpdateNotificationAlert = async () => {
    await seenNotifications();
    await getNotifications({ seen: false }, true);
  };

  return {
    getNotifications,
    seenNotifications,
    seenAndUpdateNotificationAlert,
    deleteNotifications,
  };
}
