import { useDispatch } from "react-redux";
import { logout as signout } from "../../../helpers/auth";

interface IHook {
  logout: () => Promise<void>;
}

export default function useLoginActions(): IHook {
  const dispatch = useDispatch();
  const logout = async () => signout(dispatch);

  return {
    logout,
  };
}
