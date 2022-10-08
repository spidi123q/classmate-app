import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { RefreshControl } from "react-native";
import NativeLayout from "../../../../common/components/NativeLayout";
import useVideoAPI from "../../hooks/useVideoAPI";
import { videoQuery } from "../Videos";
import { HeaderCover } from "./HeaderCover";
import { HeaderMenu } from "./HeaderMenu";
import { InfoSlideShow } from "./InfoSlideShow";
import { IntroVideos } from "./IntroVideos";

export function Home() {
  const { getVideos, reloadVideos, isLoading } = useVideoAPI();
  return (
    <NativeLayout
      scroll
      lockToPortrait
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => reloadVideos(videoQuery)}
        />
      }
    >
      <HeaderMenu />
      <InfoSlideShow />
      <HeaderCover />
      <IntroVideos />
    </NativeLayout>
  );
}
