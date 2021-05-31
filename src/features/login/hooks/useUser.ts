import _ from "lodash";
import { useSelector } from "react-redux";
import AppState from "../../../store/AppState";

/**
 * Get user data
 * @param keys List of user properties
 */
export default function useUser() {
  const user = useSelector((state: AppState) => state.login.user);
  return user;
}
