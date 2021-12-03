import { IRequest } from "../../../common/helpers/axios";
import { RequestTypes } from "../../../common/models/enum";
import { IBookingEdit } from "../../../models/Booking";

export default function (id: string, organizationEdit: IBookingEdit): IRequest {
  return {
    url: `/api/v1/Booking/${id}`,
    method: RequestTypes.Put,
    data: organizationEdit,
  };
}
