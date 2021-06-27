import { IRequest } from "../../../common/helpers/axios";
import { RequestTypes } from "../../../common/models/enum";
import { IOrganizationEdit } from "../../../models/Organization";

export default function (organizationEdit: IOrganizationEdit): IRequest {
  return {
    url: `/api/v1/Video`,
    method: RequestTypes.Post,
    data: organizationEdit,
  };
}
