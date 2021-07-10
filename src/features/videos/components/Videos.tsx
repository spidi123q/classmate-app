import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { RefreshControl } from "react-native";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { DefaultPlaceholderList } from "../../../common/config/constants";
import { DefaultMargin } from "../../../common/config/themeConfig";
import { IVideoQuery } from "../../../models/Video";
import useVideo from "../hooks/useVideo";
import useVideoAPI from "../hooks/useVideoAPI";
import HeaderCover from "./headerCover/HeaderCover";
import VideoList from "./VideoList";

export default function () {
  const { getVideos, reloadVideos, isLoading } = useVideoAPI();
  const { videoSummary } = useVideo();
  const showPlaceholder: boolean = isLoading && isEmpty(videoSummary?.docs);

  useEffect(() => {
    getVideos(videoQuery);
  }, []);

  return (
    <NativeLayout
      scroll
      noSafeArea
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => reloadVideos(videoQuery)}
        />
      }
    >
      <HeaderCover isLoading={showPlaceholder} />
      <NativeView marginHorizontal={DefaultMargin} marginBottom={DefaultMargin}>
        <VideoList isLoading={showPlaceholder} />
        <VideoList isLoading={showPlaceholder} />
        <VideoList isLoading={showPlaceholder} />
        <VideoList isLoading={showPlaceholder} />
      </NativeView>
    </NativeLayout>
  );
}

const videoQuery: IVideoQuery = {
  active: true,
  pagination: false,
};
