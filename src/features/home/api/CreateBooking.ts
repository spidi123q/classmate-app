import { IRequest } from "../../../common/helpers/axios";
import { RequestTypes } from "../../../common/models/enum";
import { IBookingEdit } from "../../../models/Booking";

export default function (organizationEdit: IBookingEdit): IRequest {
  return {
    url: `/api/v1/Booking`,
    method: RequestTypes.Post,
    data: organizationEdit,
  };
}
