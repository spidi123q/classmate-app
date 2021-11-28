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
      flex={unsetFlex ? undefined : flex ?? 1}
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
