import { LoginActionTypes } from "./action";
import { AnyAction, Reducer } from "redux";
import {
  ILoginReducerState,
  InitialLoginReducerState,
} from "./LoginReducerState";

export const LoginReducer: Reducer<ILoginReducerState> = (
  state: ILoginReducerState = InitialLoginReducerState,
  action: AnyAction
) => {
  switch (action.type) {
    case LoginActionTypes.GetUserOnSuccess:
      console.log("action.payload", action.payload);
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
