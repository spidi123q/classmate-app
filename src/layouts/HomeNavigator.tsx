import React from "react";
import Videos from "../features/videos/components/Videos";
import { HomePages } from "../models/RoutePath";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useUser from "../features/login/hooks/useUser";
import Profile from "../features/profile/components/Profile";
import VideoDetails from "../features/videos/components/VideoDetails";
import { JitsiMeetView } from "../common/native/jitsiMeet";
import PdfViewer from "../common/components/pdfViewer";

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
          <Stack.Screen
            name={HomePages.VideoDetails}
            component={VideoDetails}
          />
          <Stack.Screen name={HomePages.JitsiMeet} component={JitsiMeetView} />
          <Stack.Screen name={HomePages.PdfViewer} component={PdfViewer} />
        </>
      )}
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator();
