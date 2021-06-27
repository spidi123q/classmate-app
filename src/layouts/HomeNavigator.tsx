import React from "react";
import Videos from "../features/videos/components/Videos";
import { HomePages } from "../models/RoutePath";
import { createStackNavigator } from "@react-navigation/stack";
import useUser from "../features/login/hooks/useUser";
import Profile from "../features/profile/components/Profile";

export default function HomeNavigator() {
  const user = useUser();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user.active && (
        <>
          <Stack.Screen name={HomePages.Videos} component={Videos} />
        </>
      )}
      <Stack.Screen name={HomePages.Profile} component={Profile} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
