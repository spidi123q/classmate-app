import React, { useEffect } from "react";
import { isAuthorized } from "../helpers/auth";
import { UserPermissions, UserRoles } from "../models/enum";
import useUser from "../features/login/hooks/useUser";
import LoginNavigator from "./LoginNavigator";
import useAppInfo from "../common/hooks/useAppInfo";
import ErrorLayout from "./errorLayout/ErrorLayout";
import { BottomNavigator } from "./BottomNavigator";

const DashboardRoute: React.FunctionComponent = () => {
  const user = useUser();
  const { isValidVersion } = useAppInfo();

  if (!isValidVersion) {
    return <ErrorLayout type="update" />;
  }

  if (isAuthorized(user?.permissions, UserPermissions.WriteUserSelf)) {
    return <BottomNavigator />;
  } else {
    return <LoginNavigator />;
  }
};

export default DashboardRoute;
