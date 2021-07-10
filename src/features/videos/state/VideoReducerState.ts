import IVideo from "../../../models/Video";

export interface IVideoReducerState {
  videos: IVideo[];
}

export const InitialVideoReducerState: IVideoReducerState = {
  videos: [],
};
