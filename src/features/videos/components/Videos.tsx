import { filter, groupBy, isEmpty } from "lodash";
import React, { useEffect } from "react";
import { RefreshControl } from "react-native";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import { DefaultMargin } from "../../../common/config/themeConfig";
import IVideo, { IVideoQuery } from "../../../models/Video";
import useUser from "../../login/hooks/useUser";
import useVideo from "../hooks/useVideo";
import useVideoAPI from "../hooks/useVideoAPI";
import { DocumentList } from "./documents/DocumentList";
import HeaderCover from "./headerCover/HeaderCover";
import VideoList from "./VideoList";

export default function () {
  const { getVideos, reloadVideos, isLoading } = useVideoAPI();
  const { videoSummary } = useVideo();
  const showPlaceholder: boolean = isLoading && isEmpty(videoSummary?.docs);
  const videos: IVideo[] = filter(
    videoSummary.docs,
    (doc) => doc.classroomId && doc.category
  ) as IVideo[];
  const videosByCategory = groupBy(videos, (video) => video.category);

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
        {Object.keys(videosByCategory).map((category) => (
          <VideoList
            title={category}
            isLoading={showPlaceholder}
            key={category}
            videos={videosByCategory[category]}
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
