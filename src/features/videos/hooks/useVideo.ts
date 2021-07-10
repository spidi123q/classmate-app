import { useSelector } from "react-redux";
import AppState from "../../../store/AppState";

export default function useVideo() {
  const video = useSelector((state: AppState) => state.video);
  return video;
}
