import { IRequest } from "../../../common/helpers/axios";
import { IUserEdit } from "../../../models/User";
import { RequestTypes } from "../../../common/models/enum";

const UpdateUser = (userEdit: IUserEdit): IRequest => {
  return {
    url: "/api/v1/User",
    method: RequestTypes.Put,
    data: userEdit,
  };
};
export default UpdateUser;
