import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect } from "react";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import VideoPlayer from "../../../common/components/videoPlayer/VideoPlayer";

export default function VideoDetails() {
  const navigation = useNavigation();
  useEffect(() => {}, []);
  return (
    <NativeLayout scroll noSafeArea>
      <VideoPlayer
        source={{
          uri: "https://amssamples.streaming.mediaservices.windows.net/3b970ae0-39d5-44bd-b3a3-3136143d6435/AzureMediaServicesPromo.ism/manifest(format=m3u8-aapl)",
          type: "m3u8",
        }}
        style={{ height: 400 }}
        onBack={navigation.goBack}
      />
    </NativeLayout>
  );
}
