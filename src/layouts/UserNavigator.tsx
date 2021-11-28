import React from "react";
import Videos from "../features/videos/components/Videos";
import { createStackNavigator } from "@react-navigation/stack";
import useUser from "../features/login/hooks/useUser";
import Profile from "../features/profile/components/Profile";
import VideoDetails from "../features/videos/components/VideoDetails";
import { JitsiMeetView } from "../common/native/jitsiMeet";
import Booking from "../features/home/components/Booking";
import { IUserStackParamList } from "../models/RoutePath";
import Authorization from "../features/login/components/Authorization";
import { UserPermissions } from "../models/enum";

export default function UserNavigator() {
  const user = useUser();
  return (
    <Authorization requiredPermission={UserPermissions.WriteUserSelf}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user.active && (
          <>
            <Stack.Screen name="JitsiMeet" component={JitsiMeetView} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Booking" component={Booking} />
          </>
        )}
      </Stack.Navigator>
    </Authorization>
  );
}

const Stack = createStackNavigator<IUserStackParamList>();
