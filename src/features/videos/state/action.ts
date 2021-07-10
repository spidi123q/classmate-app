import { createAction } from "redux-actions";
import IVideo from "../../../models/Video";
export enum VideoActionTypes {
  GetVideos = "@@UI/videos/GetVideos",
  GetVideosOnSuccess = "@@UI/videos/GetVideosOnSuccess",
  GetVideosOnFail = "@@UI/login/GetUserOnFail",
}

export const VideoActions = {
  GetUserOnSuccess: createAction(
    VideoActionTypes.GetVideosOnSuccess,
    (videos: IVideo[]) => videos
  ),
};
