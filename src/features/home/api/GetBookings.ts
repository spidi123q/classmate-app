import { IRequest } from "../../../common/helpers/axios";
import { removeWhiteSpace } from "../../../common/helpers/transform";
import { IBookingQuery } from "../../../models/Booking";

export default function (query?: IBookingQuery): IRequest {
  const url = "/api/v1/Booking";
  return {
    url,
    params: query,
  };
}
