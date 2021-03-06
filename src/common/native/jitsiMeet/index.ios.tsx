import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  NativeModules,
  requireNativeComponent,
  useWindowDimensions,
} from "react-native";
import { IParams } from ".";

const VideoView = requireNativeComponent<any>("RNJitsiMeetView");
export const RNJitsiMeet = NativeModules.RNJitsiMeetView;

export const JitsiMeetView = () => {
  const { params } = useRoute();
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    const { userInfo, url } = params as IParams;
    RNJitsiMeet.join(url, userInfo);
  }, []);
  const onConferenceTerminated = (nativeEvent: any) => {
    navigation.goBack();
    /* Conference terminated event */
  };

  const onConferenceJoined = (nativeEvent: any) => {
    /* Conference joined event */
  };

  const onConferenceWillJoin = (nativeEvent: any) => {
    /* Conference will join event */
  };
  return (
    <VideoView
      style={{ height, width }}
      onConferenceTerminated={onConferenceTerminated}
      onConferenceJoined={onConferenceJoined}
      onConferenceWillJoin={onConferenceWillJoin}
    />
  );
};
