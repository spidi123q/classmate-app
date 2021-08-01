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
import NativeLayout from "../../components/NativeLayout";
import NativeView from "../../components/NativeView";
import Loader from "../../components/Loader";

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
    <NativeLayout>
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
        loadingComponent={() => (
          <NativeView
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader size={150} type="loader" />
          </NativeView>
        )}
      />
    </NativeLayout>
  );
};

export const RNJitsiMeet = {
  join: () => {},
};
