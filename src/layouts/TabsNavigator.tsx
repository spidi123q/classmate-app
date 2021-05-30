import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DefaultBackgroundColor } from "../common/config/themeConfig";
import Profile from "../features/profile/components/Profile";
import {
  HomePages,
  ProductPages,
  RoutePath,
  TabPages,
} from "../models/RoutePath";
import HeaderNavigation from "./headerNavigation/HeaderNavigation";
import ServicesSummary from "../features/profile/components/servicesSummary/ServicesSummary";
import Login from "../features/login/components/Login";
export default function TabNavigator() {
  useEffect(() => {}, []);

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: DefaultBackgroundColor,
      }}
      tabBar={(props) => <HeaderNavigation {...props} />}
      initialRouteName={TabPages.WalletPage}
    >
      <Tab.Screen name={TabPages.ServicesPage} component={ServicesSummary} />
    </Tab.Navigator>
  );
}

// type any is given to fix type bug with options props whcih may be adressing in future release
const hideTabOption: any = {
  tabBarVisible: false,
};

const Tab = createMaterialTopTabNavigator();
