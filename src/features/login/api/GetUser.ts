import { LoginActionTypes } from "../state/action";
import { IRequest } from "../../../common/helpers/axios";

const GetUser = (stateUpdate: boolean = true): IRequest => {
  return {
    url: "/api/v1/User",
    actionType: stateUpdate ? LoginActionTypes.GetUser : undefined,
  };
};
export default GetUser;
