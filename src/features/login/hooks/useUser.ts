import _ from "lodash";
import User from "../../../models/User";
import { useSelector } from "react-redux";
import AppState from "../../../store/AppState";

type IKeys = keyof User;

/**
 * Get user data
 * @param keys List of user properties
 */
export default function useUser() {
  const user = useSelector((state: AppState) => state.login.user);
  return user;
}
