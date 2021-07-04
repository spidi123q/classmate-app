import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import VideoPlayer from "../../../common/components/videoPlayer/VideoPlayer";
import {
  DefaultMargin,
  DefaultOpacity,
  DescriptionLineHeight,
} from "../../../common/config/themeConfig";
import VideoList from "./VideoList";

export function VideoDetails() {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  return (
    <NativeLayout statusBarColor="black" noSafeArea>
      <ScrollView ref={scrollRef}>
        <VideoPlayer
          source={{
            uri: "https://amssamples.streaming.mediaservices.windows.net/3b970ae0-39d5-44bd-b3a3-3136143d6435/AzureMediaServicesPromo.ism/manifest(format=m3u8-aapl)",
            type: "m3u8",
          }}
          style={{ height: 400 }}
          onBack={navigation.goBack}
          onEnterFullscreen={() => {
            scrollRef.current?.setNativeProps({
              scrollEnabled: false,
            });
          }}
          onExitFullscreen={() => {
            scrollRef.current?.setNativeProps({
              scrollEnabled: true,
            });
          }}
        />
        <NativeView
          marginVertical={DefaultMargin}
          marginHorizontal={DefaultMargin}
        >
          <NativeView marginBottom={DefaultMargin / 2}>
            <Typography opacity={DefaultOpacity} type="xs">
              STD 10 · PHYSICS
            </Typography>
            <Typography family="medium" type="h3x">
              Basic of Electromagnetic Induction
            </Typography>
          </NativeView>
          <NativeView>
            <Typography opacity={DefaultOpacity}>Description</Typography>
            <Typography
              marginTop={DefaultMargin / 5}
              lineHeight={DescriptionLineHeight}
            >
              myOrdersUp saves you time and money by consolidating all of the
              #online food delivery apps into one convenient app while showing
              you the best deal from your #favorite restaurants!
            </Typography>
          </NativeView>
          <VideoList
            titleComponent={
              <Typography opacity={DefaultOpacity}>
                Learn Next on Physics
              </Typography>
            }
          />
        </NativeView>
      </ScrollView>
    </NativeLayout>
  );
}

export default React.memo(VideoDetails);
