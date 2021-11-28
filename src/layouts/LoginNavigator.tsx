import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../features/login/components/Login";
import OtpVerifier from "../features/login/components/OtpVerifier";
import ProfileForm from "../features/login/components/ProfileForm";
import { ILoginStackParamList } from "../models/RoutePath";

export default function LoginNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"Verify OTP"} component={OtpVerifier} />
      <Stack.Screen name={"Complete Profile"} component={ProfileForm} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator<ILoginStackParamList>();
