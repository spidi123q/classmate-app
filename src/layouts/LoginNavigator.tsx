import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../features/login/components/Login";
import OtpVerifier from "../features/login/components/OtpVerifier";
import ProfileForm from "../features/login/components/profileForm/ProfileForm";
import { RoutePath } from "../models/RoutePath";
import DashboardRoute from "./DashboardRoute";
import Intro from "../features/login/components/Intro";
import useFirstLauch from "../common/hooks/useFirstLauch";
import SystemConfig from "../SystemConfig";
import { IsMobile } from "../common/config/constants";

export default function LoginNavigator() {
  const { isFirstLaunch } = useFirstLauch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isFirstLaunch && IsMobile && (
        <Stack.Screen name={RoutePath.Intro} component={Intro} />
      )}
      <Stack.Screen name={RoutePath.Login} component={Login} />
      <Stack.Screen name={RoutePath.OtpVerifier} component={OtpVerifier} />
      <Stack.Screen name={RoutePath.ProfileComplete} component={ProfileForm} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
