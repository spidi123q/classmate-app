import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import NativeLayout from "../../../common/components/NativeLayout";
import HeaderCover from "./headerCover/HeaderCover";
import { HeaderMenu } from "./headerCover/HeaderMenu";
import { InfoSlideShow } from "./InfoSlideShow";

export function Home() {
  return (
    <NativeLayout scroll lockToPortrait>
      <HeaderMenu />
      <InfoSlideShow />
    </NativeLayout>
  );
}
