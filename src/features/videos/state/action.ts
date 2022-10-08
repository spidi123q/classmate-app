import { createAction } from "redux-actions";
import { IPaginateResponse } from "../../../common/models/PaginateResult";
import IVideo from "../../../models/Video";
export enum VideoActionTypes {
  GetVideos = "@@UI/videos/GetVideos",
  GetVideosOnSuccess = "@@UI/videos/GetVideosOnSuccess",
  GetVideosOnFail = "@@UI/videos/GetUserOnFail",
  SetLastPlayedVideo = "@@UI/videos/SetLastPlayedVideo",
}

export const VideoActions = {
  GetVideoOnSuccess: createAction(
    VideoActionTypes.GetVideosOnSuccess,
    (result: IPaginateResponse<IVideo>) => result
  ),
  SetLastPlayedVideo: createAction(
    VideoActionTypes.SetLastPlayedVideo,
    (video: IVideo | undefined) => video
  ),
};
