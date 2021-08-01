import React from "react";
import { StatusBar } from "react-native";
import { IsMobile } from "../config/constants";
import { DefaultBackgroundColor } from "../config/themeConfig";
import Loader from "./Loader";
import NativeView from "./NativeView";

export default function FullscreenLoader() {
  return (
    <NativeView
      backgroundColor={DefaultBackgroundColor}
      flex={IsMobile ? 1 : undefined}
      height={IsMobile ? undefined : "100vh"}
    >
      <Loader />
      <StatusBar
        backgroundColor={DefaultBackgroundColor}
        barStyle={"light-content"}
      />
    </NativeView>
  );
}
