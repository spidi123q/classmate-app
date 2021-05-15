import _ from "lodash";
import { useSelector } from "react-redux";
import AppState from "../../store/AppState";
import { AppInfoReducerState } from "../state/AppInfoReducerState";

/**
 * Get user data
 * @param keys List of appInfo properties
 */
export default function useAppInfo() {
  const appInfo = useSelector((state: AppState) => state.appInfo);
  return appInfo;
}
