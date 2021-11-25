import React, { useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  RefreshControlProps,
} from "react-native";

import { IsMobile } from "../config/constants";
import { DefaultBackgroundColor, DefaultMargin } from "../config/themeConfig";
import NativeView from "./NativeView";
import { useFocusEffect } from "@react-navigation/native";
import Orientation from "../native/orientation";

export interface INativeLayoutProps {
  backgroundColor?: string;
  statusBarColor?: string;
  barStyle?: "default" | "light-content" | "dark-content";
  animated?: boolean;
  horizontalMargin?: boolean;
  marginTop?: number;
  noSafeArea?: boolean;
  scroll?: boolean;
  lockToPortrait?: boolean;
  refreshControl?:
    | React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
      >
    | undefined;
}

const NativeLayout: React.FunctionComponent<INativeLayoutProps> = (props) => {
  const {
    children,
    barStyle,
    animated,
    backgroundColor,
    horizontalMargin,
    marginTop,
    statusBarColor,
    noSafeArea,
    scroll,
    refreshControl,
    lockToPortrait,
    ...rest
  } = props;

  useFocusEffect(() => {
    if (lockToPortrait) {
      Orientation.lockToPortrait();
    }
  });

  return (
    <NativeView
      type={noSafeArea ? undefined : "safeArea"}
      backgroundColor={backgroundColor ?? DefaultBackgroundColor}
    >
      {children}
      <StatusBar
        backgroundColor={statusBarColor ?? DefaultBackgroundColor}
        barStyle={barStyle ?? "light-content"}
      />
    </NativeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  safeArea: {
    flex: IsMobile ? 1 : undefined,
    height: !IsMobile ? "100vh" : undefined,
  },
});

export default NativeLayout;
