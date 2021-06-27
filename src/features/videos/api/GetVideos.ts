import { IRequest } from "../../../common/helpers/axios";
import { removeWhiteSpace } from "../../../common/helpers/transform";
import { IVideoQuery } from "../../../models/Video";

export default function (query?: IVideoQuery): IRequest {
  const url = "/api/v1/Video";
  return {
    url,
    params: query,
  };
}
