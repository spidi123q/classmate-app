import { filter, sortBy } from "lodash";
import IVideo from "../../../models/Video";

export default class VideoListDTO {
  private readonly videos: IVideo[];

  constructor(videos: IVideo[]) {
    this.videos = [...videos];
  }

  public byCategory(category: string): VideoListDTO {
    const result = filter(this.videos, {
      category,
    });
    return new VideoListDTO(result);
  }

  public orderGreaterThan(order: number): VideoListDTO {
    const result = filter(this.videos, (video) => video.order > order);
    return new VideoListDTO(result);
  }

  public getVideos(): IVideo[] {
    return sortBy(this.videos, "order");
  }
}
