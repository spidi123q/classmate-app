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
import NativeView, { INativeViewProps } from "./NativeView";
import { useFocusEffect } from "@react-navigation/native";
import Orientation from "../native/orientation";

export interface INativeLayoutProps {
  backgroundColor?: string;
  statusBarColor?: string;
  barStyle?: "default" | "light-content" | "dark-content";
  animated?: boolean;
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

const NativeLayout: React.FunctionComponent<
  INativeLayoutProps & INativeViewProps
> = (props = { flex: 1 }) => {
  const {
    children,
    barStyle,
    animated,
    backgroundColor,
    statusBarColor,
    noSafeArea,
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
      {...rest}
    >
      {children}
      <StatusBar
        backgroundColor={statusBarColor ?? DefaultBackgroundColor}
        barStyle={barStyle ?? "light-content"}
      />
    </NativeView>
  );
};

export default NativeLayout;
