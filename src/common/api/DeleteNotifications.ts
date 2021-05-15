import { IRequest } from "../helpers/axios";
import { RequestTypes } from "../models/enum";

const DeleteNotifications = (): IRequest => {
  return {
    url: "/api/v1/Notification",
    method: RequestTypes.Delete,
  };
};
export default DeleteNotifications;
