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
      return { ...state, videoSummary: action.payload };
    case VideoActionTypes.SetLastPlayedVideo:
      return { ...state, lastPlayedVideo: action.payload };
    default:
      return state;
  }
};
