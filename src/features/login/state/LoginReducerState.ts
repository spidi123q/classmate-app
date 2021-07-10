import IUser, { InitialUser } from "../../../models/User";

export interface ILoginReducerState {
  user: IUser;
}

export const InitialLoginReducerState: ILoginReducerState = {
  user: InitialUser,
};
