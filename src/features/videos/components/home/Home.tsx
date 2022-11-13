import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import NativeLayout from "../../../../common/components/NativeLayout";
import { IPaginateResult } from "../../../../common/models/PaginateResult";
import IVideo, { IVideoQuery } from "../../../../models/Video";
import useVideoAPI from "../../hooks/useVideoAPI";
import { HeaderCover } from "./HeaderCover";
import { HeaderMenu } from "./HeaderMenu";
import { InfoSlideShow } from "./InfoSlideShow";
import { IntroVideos } from "./IntroVideos";

export function Home() {
  const { getVideos, isLoading } = useVideoAPI();
  const [videoSummary, setVideoSummary] = useState<IPaginateResult<IVideo>>();

  const getAllVideos = async () => {
    const result = await getVideos(videoQuery);
    setVideoSummary(result.payload);
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <NativeLayout
      scroll
      lockToPortrait
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={getAllVideos} />
      }
    >
      <HeaderMenu />
      <InfoSlideShow />
      <HeaderCover />
      {videoSummary && (
        <IntroVideos videoSummary={videoSummary} isLoading={isLoading} />
      )}
    </NativeLayout>
  );
}

const videoQuery: IVideoQuery = {
  active: true,
  pagination: false,
  classroomCommon: true,
};
