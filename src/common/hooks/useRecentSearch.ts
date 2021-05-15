import { capitalize, unionBy } from "lodash";
import { useDispatch } from "react-redux";
import { AppInfoActions } from "../state/AppInfoAction";
import useAppInfo from "./useAppInfo";

export default function useRecentSearch() {
  const { recentSearch } = useAppInfo();
  const dispatch = useDispatch();

  const add = async (searchTerm: string) => {
    const uniqList = unionBy(
      [capitalize(searchTerm), ...recentSearch],
      capitalize
    );
    await dispatch(AppInfoActions.SetRecentSearch(uniqList));
  };

  return {
    add,
    recentSearch,
  };
}
