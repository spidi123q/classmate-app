import IUser, { InitialUser } from "../../../models/User";

export interface LoginReducerState {
  user: IUser;
}

export const InitialLoginReducerState: LoginReducerState = {
  user: InitialUser,
};
