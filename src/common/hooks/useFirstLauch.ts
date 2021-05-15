import { useDispatch } from "react-redux";
import { AppInfoActions } from "../state/AppInfoAction";
import useAppInfo from "./useAppInfo";

export default function useFirstLauch() {
  const dispatch = useDispatch();
  const { isFirstLaunch } = useAppInfo();

  const onFirstLaunch = () => dispatch(AppInfoActions.SetFirstLaunch(false));

  return {
    isFirstLaunch,
    onFirstLaunch,
  };
}
