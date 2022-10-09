import { filter, groupBy, isEmpty } from "lodash";
import React, { useEffect } from "react";
import { RefreshControl } from "react-native";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import { DefaultMargin } from "../../../common/config/themeConfig";
import useAppInfo from "../../../common/hooks/useAppInfo";
import IVideo, { IVideoQuery } from "../../../models/Video";
import useUser from "../../login/hooks/useUser";
import useVideo from "../hooks/useVideo";
import useVideoAPI from "../hooks/useVideoAPI";
import VideoList, { Placeholder } from "./VideoList";

export default function () {
  const { reloadVideos, isLoading } = useVideoAPI();
  const { videoSummary } = useVideo();
  const { getVideos } = useVideoAPI();

  useEffect(() => {
    getVideos(videoQuery);
  }, []);

  const videos: IVideo[] = filter(
    videoSummary.docs,
    (doc) => !isEmpty(doc.classroomId) && !isEmpty(doc.category)
  ) as IVideo[];
  const videosByCategory = groupBy(videos, (video) => video.category);

  const showPlaceholder: boolean = isLoading && isEmpty(videosByCategory);

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
        {showPlaceholder &&
          [1, 2, 3, 4].map((item) => <Placeholder key={item} />)}
      </NativeView>
    </NativeLayout>
  );
}

export const videoQuery: IVideoQuery = {
  active: true,
  pagination: false,
};
