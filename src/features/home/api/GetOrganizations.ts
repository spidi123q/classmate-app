import { IRequest } from "../../../common/helpers/axios";
import { removeWhiteSpace } from "../../../common/helpers/transform";
import { IOrganizationQuery } from "../../../models/Organization";

export default function (query?: IOrganizationQuery): IRequest {
  if (query?.phone) {
    query.phone = removeWhiteSpace(query.phone);
  }

  const url = "/api/v1/Organization";
  return {
    url,
    params: query,
  };
}
