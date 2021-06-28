import React from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Platform,
  ScrollView,
} from "react-native";
import SystemConfig from "../../SystemConfig";
import { IsMobile } from "../config/constants";
import { DefaultBackgroundColor, DefaultMargin } from "../config/themeConfig";
import NativeView from "./NativeView";

export interface INativeLayoutProps {
  backgroundColor?: string;
  statusBarColor?: string;
  barStyle?: "default" | "light-content" | "dark-content";
  animated?: boolean;
  horizontalMargin?: boolean;
  marginTop?: number;
  noSafeArea?: boolean;
  scroll?: boolean;
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
    ...rest
  } = props;

  const LayoutView = noSafeArea ? View : SafeAreaView;

  return (
    <LayoutView
      style={[
        styles.safeArea,
        {
          backgroundColor: backgroundColor ?? DefaultBackgroundColor,
        },
      ]}
    >
      <NativeView
        type={scroll ? "scroll" : undefined}
        style={[
          styles.container,
          {
            marginHorizontal: horizontalMargin ? DefaultMargin : undefined,
            marginTop,
          },
        ]}
      >
        <StatusBar
          backgroundColor={statusBarColor ?? DefaultBackgroundColor}
          barStyle={barStyle ?? "light-content"}
        />
        {children}
      </NativeView>
    </LayoutView>
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
