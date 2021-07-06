import React, { useEffect } from "react";
import { RefreshControl } from "react-native";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { DefaultMargin } from "../../../common/config/themeConfig";
import HeaderCover from "./headerCover/HeaderCover";
import VideoList from "./VideoList";

export default function () {
  useEffect(() => {}, []);
  return (
    <NativeLayout
      scroll
      noSafeArea
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => {}} />
      }
    >
      <HeaderCover />
      <NativeView marginHorizontal={DefaultMargin} marginBottom={DefaultMargin}>
        <VideoList />
        <VideoList />
        <VideoList />
        <VideoList />
      </NativeView>
    </NativeLayout>
  );
}
