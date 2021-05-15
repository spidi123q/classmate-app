import React, { useEffect } from "react";
import { isAuthorized } from "../helpers/auth";
import { UserPermissions, UserRoles } from "../models/enum";
import useUser from "../features/login/hooks/useUser";
import { HomePages, RoutePath } from "../models/RoutePath";
import { useNavigation } from "@react-navigation/native";
import TabNavigator from "./TabsNavigator";
import LoginNavigator from "./LoginNavigator";
import ProductNavigator from "./ProductNavigator";
const DashboardRoute: React.FunctionComponent = () => {
  const { permissions } = useUser();

  if (isAuthorized(permissions, UserPermissions.ReadProductSelf)) {
    return <ProductNavigator />;
  } else {
    return <LoginNavigator />;
  }
};

export default DashboardRoute;
