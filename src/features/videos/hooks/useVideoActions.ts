import { useDispatch } from "react-redux";
import IVideo from "../../../models/Video";
import { VideoActions } from "../state/action";

export default function useVideoActions() {
  const dispatch = useDispatch();

  const setLastPlayedVideo = (video?: IVideo) =>
    dispatch(VideoActions.SetLastPlayedVideo(video));

  return {
    setLastPlayedVideo,
  };
}
