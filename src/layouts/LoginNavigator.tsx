import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../features/login/components/Login";
import OtpVerifier from "../features/login/components/OtpVerifier";
import ProfileForm from "../features/login/components/profileForm/ProfileForm";
import { ILoginStackParamList } from "../models/RoutePath";
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
        <Stack.Screen name="Intro" component={Intro} />
      )}

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Login OTP" component={OtpVerifier} />
      <Stack.Screen name="Login Complete Profile" component={ProfileForm} />
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator<ILoginStackParamList>();
