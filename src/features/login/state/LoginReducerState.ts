import User, { InitialUser } from "../../../models/User";

export interface LoginReducerState {
    user: User 
}

export const InitialLoginReducerState: LoginReducerState = {
    user: InitialUser
}   