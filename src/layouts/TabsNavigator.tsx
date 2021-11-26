import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DefaultBackgroundColor } from "../common/config/themeConfig";
import Profile from "../features/profile/components/Profile";
import { TabPages } from "../models/RoutePath";
import HeaderNavigation from "./headerNavigation/HeaderNavigation";
import Login from "../features/login/components/Login";
import { Explore } from "../features/home/components/Explore";
import { MyBookings } from "../features/home/components/MyBookings";
export default function TabNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: DefaultBackgroundColor,
      }}
      tabBar={(props) => <HeaderNavigation {...props} />}
    >
      <Tab.Screen name={TabPages.Explore} component={Explore} />
      <Tab.Screen name={TabPages.MyBookings} component={MyBookings} />
    </Tab.Navigator>
  );
}

// type any is given to fix type bug with options props whcih may be adressing in future release
const hideTabOption: any = {
  tabBarVisible: false,
};

const Tab = createMaterialTopTabNavigator();
