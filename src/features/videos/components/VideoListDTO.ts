import { filter, sortBy } from "lodash";
import IVideo from "../../../models/Video";

export default class VideoListDTO {
  private readonly videos: IVideo[];

  constructor(videos: IVideo[]) {
    this.videos = [...videos];
  }

  public getVideosByCategory(category: string): VideoListDTO {
    const result = filter(this.videos, {
      category,
    });
    return new VideoListDTO(result);
  }

  public getVideos(): IVideo[] {
    return sortBy(this.videos, "order");
  }
}
