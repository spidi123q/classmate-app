import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  NativeModules,
  requireNativeComponent,
  useWindowDimensions,
} from "react-native";
import Jitsi from "react-jitsi";
import { IParams } from ".";
import { getSystemConfigValue } from "../../helpers/remoteConfig";

export const JitsiMeetView = () => {
  const params = useRoute().params as IParams;
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  const onAPILoad = (api: any) => {
    api.addListener("readyToClose", () => {
      navigation.goBack();
    });
  };

  return (
    <Jitsi
      roomName={params.roomName}
      displayName={params.userInfo.displayName}
      domain={getSystemConfigValue("jitsiDomain") as string}
      config={{
        // @ts-ignore
        prejoinPageEnabled: false,
      }}
      frameStyle={{ height, width }}
      onAPILoad={onAPILoad}
    />
  );
};

export const RNJitsiMeet = {
  join: () => {},
};
