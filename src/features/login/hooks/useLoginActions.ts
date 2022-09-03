import { useDispatch } from "react-redux";
import { logout as signout } from "../../../helpers/auth";
import IUser from "../../../models/User";
import { LoginActions } from "../state/action";

export default function useLoginActions() {
  const dispatch = useDispatch();
  const logout = async () => signout(dispatch);

  const setUser = (user: IUser) =>
    dispatch(LoginActions.GetUserOnSuccess(user));

  return {
    logout,
    setUser,
  };
}
