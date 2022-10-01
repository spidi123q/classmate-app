import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { RefreshControl } from "react-native";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import { DefaultMargin } from "../../../common/config/themeConfig";
import { IVideoQuery } from "../../../models/Video";
import useUser from "../../login/hooks/useUser";
import useVideo from "../hooks/useVideo";
import useVideoAPI from "../hooks/useVideoAPI";
import { DocumentList } from "./documents/DocumentList";
import HeaderCover from "./headerCover/HeaderCover";
import VideoList from "./VideoList";
import VideoListDTO from "./VideoListDTO";

export default function () {
  const { getVideos, reloadVideos, isLoading } = useVideoAPI();
  const { classroom } = useUser();
  const { videoSummary } = useVideo();
  const showPlaceholder: boolean = isLoading && isEmpty(videoSummary?.docs);
  const videoListDTO = new VideoListDTO(videoSummary?.docs ?? []);

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
      lockToPortrait
    >
      <NativeView marginHorizontal={DefaultMargin} marginBottom={DefaultMargin}>
        <DocumentList />
        {classroom?.categories.map((category) => (
          <VideoList
            title={category}
            isLoading={showPlaceholder}
            key={category}
            videos={videoListDTO.byCategory(category).getVideos()}
          />
        ))}
      </NativeView>
    </NativeLayout>
  );
}

const videoQuery: IVideoQuery = {
  active: true,
  pagination: false,
};
