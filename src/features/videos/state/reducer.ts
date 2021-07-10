import { AnyAction, Reducer } from "redux";
import { VideoActionTypes } from "./action";
import {
  InitialVideoReducerState,
  IVideoReducerState,
} from "./VideoReducerState";

export const VideoReducer: Reducer<IVideoReducerState> = (
  state: IVideoReducerState = InitialVideoReducerState,
  action: AnyAction
) => {
  switch (action.type) {
    case VideoActionTypes.GetVideosOnSuccess:
      return { ...state, videos: action.payload };
    default:
      return state;
  }
};
