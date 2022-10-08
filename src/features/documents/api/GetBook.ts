import { IRequest } from "../../../common/helpers/axios";
import { removeWhiteSpace } from "../../../common/helpers/transform";
import { IBookQuery } from "../../../models/Book";

export default function (query?: IBookQuery): IRequest {
  const url = "/api/v1/Book";
  return {
    url,
    params: query,
  };
}
