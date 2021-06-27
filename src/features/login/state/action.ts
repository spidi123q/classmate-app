import { createAction } from "redux-actions";
import IUser from "../../../models/User";
export enum LoginActionTypes {
  GetUser = "@@UI/login/GetUser",
  GetUserOnSuccess = "@@UI/login/GetUserOnSuccess",
  GetUserOnFail = "@@UI/login/GetUserOnFail",
  GetFirebaseUser = "@@UI/login/GetFirebaseUser",
  GetFirebaseUserOnSuccess = "@@UI/login/GetFirebaseUserOnSuccess",
  GetFirebaseUserOnFail = "@@UI/login/GetFirebaseUserOnFail",
}

export const LoginActions = {
  GetUser: createAction(LoginActionTypes.GetUser),
  GetUserOnSuccess: createAction(
    LoginActionTypes.GetUserOnSuccess,
    (user: IUser) => user
  ),
  GetUserOnFail: createAction(LoginActionTypes.GetUserOnFail),
  GetFirebaseUser: createAction(LoginActionTypes.GetFirebaseUser),
  GetFirebaseUserOnSuccess: createAction(
    LoginActionTypes.GetFirebaseUserOnSuccess
  ),
  GetFirebaseUserOnFail: createAction(LoginActionTypes.GetFirebaseUserOnFail),
};
