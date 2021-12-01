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
import NativeView, { INativeViewProps, IViewProps } from "./NativeView";
import { useFocusEffect } from "@react-navigation/native";
import Orientation from "../native/orientation";

export interface INativeLayoutProps extends IViewProps {
  backgroundColor?: string;
  statusBarColor?: string;
  barStyle?: "default" | "light-content" | "dark-content";
  animated?: boolean;
  noSafeArea?: boolean;
  scroll?: boolean;
  lockToPortrait?: boolean;
  unsetFlex?: boolean;
  unsetHeight?: boolean;
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
    statusBarColor,
    noSafeArea,
    lockToPortrait,
    unsetFlex,
    flex,
    height,
    unsetHeight,
    ...rest
  } = props;

  useFocusEffect(() => {
    if (lockToPortrait) {
      Orientation.lockToPortrait();
    }
  });
  const defaultFlex = unsetFlex ? undefined : flex;
  const defaultHeight = unsetHeight ? undefined : height;

  return (
    <NativeView
      type={noSafeArea ? undefined : "safeArea"}
      backgroundColor={backgroundColor ?? DefaultBackgroundColor}
      flex={defaultFlex}
      height={defaultHeight}
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

NativeLayout.defaultProps = {
  flex: 1,
  unsetFlex: !IsMobile,
  height: !IsMobile ? "100vh" : undefined,
};

export default NativeLayout;
