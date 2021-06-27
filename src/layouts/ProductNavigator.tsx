import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NotificationList from "../features/profile/components/NotificationList";
import Profile from "../features/profile/components/Profile";
import { ProductPages, RoutePath } from "../models/RoutePath";
import SystemConfig from "../SystemConfig";
import TabsNavigator from "./TabsNavigator";

export default function ProductNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitle: SystemConfig.appName,
      }}
      initialRouteName={RoutePath.Root}
    >
      {null}
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
