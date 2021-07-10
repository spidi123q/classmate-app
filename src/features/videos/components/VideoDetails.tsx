import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { find, isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
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
import { getSystemConfigValue } from "../../../common/helpers/remoteConfig";
import { StreamingPolicyStreamingProtocol } from "../../../common/models/azure/mediaServices";
import IVideo from "../../../models/Video";
import useUser from "../../login/hooks/useUser";
import useVideo from "../hooks/useVideo";
import VideoList from "./VideoList";
import VideoListDTO from "./VideoListDTO";

export function VideoDetails() {
  const { params } = useRoute();
  const video = (params as IParam).video;
  const { height, width } = useWindowDimensions();

  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const { classroom } = useUser();
  const { videoSummary } = useVideo();
  const videoListDTO = new VideoListDTO(videoSummary?.docs ?? []);
  const nextVideos = videoListDTO
    .byCategory(video.category)
    .orderGreaterThan(video.order)
    .getVideos();

  return (
    <NativeLayout statusBarColor="black" noSafeArea>
      <ScrollView ref={scrollRef}>
        <VideoPlayer
          source={{
            uri: find(video.streamingLocatorAzure, {
              streamingProtocol: getSystemConfigValue(
                "streamingProtocol"
              ) as StreamingPolicyStreamingProtocol,
            })?.path,
            type: "m3u8",
          }}
          style={{ height: height / 2.05 }}
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
              {classroom?.name} . {video.category}
            </Typography>
            <Typography family="medium" type="h3x">
              {video.name}
            </Typography>
          </NativeView>
          <NativeView>
            <Typography opacity={DefaultOpacity}>Description</Typography>
            <Typography
              marginTop={DefaultMargin / 5}
              lineHeight={DescriptionLineHeight}
            >
              {video.description}
            </Typography>
          </NativeView>
          {!isEmpty(nextVideos) && (
            <VideoList
              videos={nextVideos}
              titleComponent={
                <Typography opacity={DefaultOpacity}>
                  Learn Next on Physics
                </Typography>
              }
            />
          )}
        </NativeView>
      </ScrollView>
    </NativeLayout>
  );
}

export interface IParam {
  video: IVideo;
}

export default React.memo(VideoDetails);
