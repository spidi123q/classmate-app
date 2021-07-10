import React, { useEffect } from "react";
import { RefreshControl } from "react-native";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { DefaultPlaceholderList } from "../../../common/config/constants";
import { DefaultMargin } from "../../../common/config/themeConfig";
import { IVideoQuery } from "../../../models/Video";
import useVideoAPI from "../hooks/useVideoAPI";
import HeaderCover from "./headerCover/HeaderCover";
import VideoList from "./VideoList";

export default function () {
  const { getVideos, reloadVideos, isLoading } = useVideoAPI();

  useEffect(() => {
    getVideos(videoQuery);
  }, []);

  return (
    <NativeLayout
      scroll
      noSafeArea
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => {}} />
      }
    >
      <HeaderCover isLoading={isLoading} />
      <NativeView marginHorizontal={DefaultMargin} marginBottom={DefaultMargin}>
        {isLoading && <Placeholder />}
        <VideoList />
        <VideoList />
        <VideoList />
        <VideoList />
      </NativeView>
    </NativeLayout>
  );
}

const Placeholder = () => (
  <>
    {DefaultPlaceholderList.map((item, index) => (
      <VideoList key={index} isLoading />
    ))}
  </>
);

const videoQuery: IVideoQuery = {
  active: true,
  pagination: false,
};
