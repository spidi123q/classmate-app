import { IRequest } from "../helpers/axios";
import { INotificationQuery } from "../models/Notification";
import IPaginatedRequest from "../models/PaginatedRequest";
import { AppInfoActionTypes } from "../state/AppInfoAction";

const GetNotifications = (
  params?: INotificationQuery,
  stateUpdate?: boolean
): IRequest => {
  return {
    url: "/api/v1/Notification",
    actionType: stateUpdate ? AppInfoActionTypes.GetNotification : undefined,
    params,
  };
};
export default GetNotifications;
