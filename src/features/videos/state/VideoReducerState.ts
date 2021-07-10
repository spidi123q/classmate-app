import {
  InitialPaginateResult,
  IPaginateResult,
} from "../../../common/models/PaginateResult";
import IVideo from "../../../models/Video";

export interface IVideoReducerState {
  videoSummary: IPaginateResult<IVideo>;
  lastPlayedVideo?: IVideo;
}

export const InitialVideoReducerState: IVideoReducerState = {
  videoSummary: InitialPaginateResult,
};
