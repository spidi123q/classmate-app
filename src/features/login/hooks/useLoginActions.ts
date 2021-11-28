import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { isAuthorized, logout as signout } from "../../../helpers/auth";
import { UserPermissions } from "../../../models/enum";
import { IAppStackNavigationProp } from "../../../models/RoutePath";
import useUser from "./useUser";

export default function useLoginActions() {
  const dispatch = useDispatch();
  const logout = async () => signout(dispatch);
  const navigation = useNavigation<IAppStackNavigationProp>();
  const { permissions } = useUser();
  const isLoggedIn = isAuthorized(permissions, UserPermissions.WriteUserSelf);

  const authorizedOnly = (callback: () => any) => {
    if (isLoggedIn) {
      callback();
    } else {
      navigation.navigate("Dashboard");
    }
  };

  return {
    logout,
    authorizedOnly,
    isLoggedIn,
  };
}
