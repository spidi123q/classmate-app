import { useDispatch, useSelector } from "react-redux";
import AppState from "../../store/AppState";
import { AppInfoActions } from "../state/AppInfoAction";
import useAppInfo from "../hooks/useAppInfo";
import FilesystemStorage from "redux-persist-filesystem-storage";

const Namespace: string = "@DocumentCache/";

export default function documentCache() {
  const get = async (key: string): Promise<string | undefined | null> => {
    try {
      const data = await FilesystemStorage.getItem(Namespace + key);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const set = async (key: string, value: string) => {
    try {
      await FilesystemStorage.setItem(Namespace + key, value);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    set,
    get,
  };
}
