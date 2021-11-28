import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DefaultBackgroundColor } from "../common/config/themeConfig";
import Profile from "../features/profile/components/Profile";
import { IIntroStackParamList, ITabParamList } from "../models/RoutePath";
import HeaderNavigation from "./headerNavigation/HeaderNavigation";
import Login from "../features/login/components/Login";
import { Explore } from "../features/home/components/Explore";
import { MyBookings } from "../features/home/components/MyBookings";
import { createStackNavigator } from "@react-navigation/stack";
import useFirstLauch from "../common/hooks/useFirstLauch";
import { IsMobile } from "../common/config/constants";
import Intro from "../features/login/components/Intro";
import useAppInfo from "../common/hooks/useAppInfo";
import ErrorLayout from "./errorLayout/ErrorLayout";

export default function TabNavigator() {
  const { isFirstLaunch } = useFirstLauch();
  const { isValidVersion } = useAppInfo();

  if (!isValidVersion) {
    return <ErrorLayout type="update" />;
  }

  if (isFirstLaunch && IsMobile) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Intro" component={Intro} />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: DefaultBackgroundColor,
      }}
      tabBar={(props) => <HeaderNavigation {...props} />}
    >
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="My Bookings" component={MyBookings} />
    </Tab.Navigator>
  );
}

// type any is given to fix type bug with options props whcih may be adressing in future release
const hideTabOption: any = {
  tabBarVisible: false,
};

const Tab = createMaterialTopTabNavigator<ITabParamList>();

const Stack = createStackNavigator<IIntroStackParamList>();
