import { IRequest } from "../helpers/axios";
import { RequestTypes } from "../models/enum";
import { INotificationQuery } from "../models/Notification";
import IPaginatedRequest from "../models/PaginatedRequest";

const PatchNotificationsAsSeen = (): IRequest => {
  return {
    url: "/api/v1/Notification/Seen",
    method: RequestTypes.Patch,
  };
};
export default PatchNotificationsAsSeen;
