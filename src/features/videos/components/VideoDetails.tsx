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
    <NativeLayout statusBarColor="black" noSafeArea>
      <ScrollView ref={scrollRef}>
        <NativeVideoPlayer
          source={{
            uri: "https://videodelivery.net/eyJhbGciOiJSUzI1NiIsImtpZCI6ImUzOTFhMDAxYjFkZDU0YjM2MjEyYjJhYThkZjQyZTk3In0.eyJzdWIiOiIwMmFjMGI4MDZjM2MyMzFjNWUxMzdkZTBjM2M3ZDUxYSIsImtpZCI6ImUzOTFhMDAxYjFkZDU0YjM2MjEyYjJhYThkZjQyZTk3IiwiZXhwIjoxNjI3OTAwNjA3fQ.XL083vmcwPFk70uJyzi1EPxB2PgQHM9sScbmsg5x68pbsdA1K6oKcPv1ZNJFYV3WZPI2aDInYUboLN-ZP-0M2pbrrfWvvWUGp21ZCb94_-iBLi-8YuPtJ2crnifeVL_DcyVGcej-xYNxaI80S6wuiMHcyWDrvaHGwtP4PexeX2WLBohTB06s44YI6VfIpUnVln2Qlq3-0hxLtAxw5FSfbEAe-EW7xrM2gYKiH4VL6sYcSM9SXvT9xQBPG9fQysZG7l2A_z3F8KqxEn5X9dVAcSoqfrb13a-xaeMJqYNpPr25pB7em2si7bFNpQJgTtWlXGfZsJuMBesh5Tl2ruu9TA/manifest/video.m3u8",
            type: "m3u8",
          }}
          cloudflareStreamVideoId={"02ac0b806c3c231c5e137de0c3c7d51a"}
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
