import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { find, first, isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import NativeVideoPlayer from "../../../common/components/videoPlayer/NativeVideoPlayer";
import {
  DefaultMargin,
  DefaultOpacity,
  DescriptionLineHeight,
} from "../../../common/config/themeConfig";
import IVideo from "../../../models/Video";
import useUser from "../../login/hooks/useUser";
import useVideo from "../hooks/useVideo";
import useVideoActions from "../hooks/useVideoActions";
import VideoList from "./VideoList";
import VideoListDTO from "./VideoListDTO";

export function VideoDetails() {
  const { params } = useRoute();
  const video = (params as IParam).video;
  const { height, width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const { classroom } = useUser();
  const { videoSummary } = useVideo();
  const { setLastPlayedVideo } = useVideoActions();
  const videoListDTO = new VideoListDTO(videoSummary?.docs ?? []);
  const nextVideos = videoListDTO
    .byCategory(video.category)
    .orderGreaterThan(video.order)
    .getVideos();

  return (
    <NativeLayout noSafeArea>
      <ScrollView ref={scrollRef}>
        <NativeVideoPlayer
          cloudflareStreamVideoId={video.cloudflareStreamVideoId}
          height={height / 2.05}
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
          onEnd={() => setLastPlayedVideo(first(nextVideos))}
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
