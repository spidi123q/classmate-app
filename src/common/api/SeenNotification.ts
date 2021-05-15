import { IRequest } from "../helpers/axios";
import { RequestTypes } from "../models/enum";
import IPaginatedRequest from "../models/PaginatedRequest";
import { AppInfoActionTypes } from "../state/AppInfoAction";

const SeenNotification = (): IRequest => {
  return {
    url: "/api/v1/Notification/Seen",
    method: RequestTypes.Patch,
  };
};
export default SeenNotification;
