import { createAction } from "redux-actions";
import IVideo from "../../../models/Video";
export enum VideoActionTypes {
  GetVideos = "@@UI/videos/GetVideos",
  GetVideosOnSuccess = "@@UI/videos/GetVideosOnSuccess",
  GetVideosOnFail = "@@UI/videos/GetUserOnFail",
  SetLastPlayedVideo = "@@UI/videos/SetLastPlayedVideo",
}

export const VideoActions = {
  GetUserOnSuccess: createAction(
    VideoActionTypes.GetVideosOnSuccess,
    (videos: IVideo[]) => videos
  ),
  SetLastPlayedVideo: createAction(
    VideoActionTypes.SetLastPlayedVideo,
    (video: IVideo | undefined) => video
  ),
};
