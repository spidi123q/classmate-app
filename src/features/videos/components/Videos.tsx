import React, { useEffect } from "react";
import { RefreshControl } from "react-native";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import HeaderCover from "./headerCover/HeaderCover";

export default function () {
  return (
    <NativeLayout
      scroll
      noSafeArea
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => {}} />
      }
    >
      <HeaderCover />
      <Typography>Home</Typography>
    </NativeLayout>
  );
}
