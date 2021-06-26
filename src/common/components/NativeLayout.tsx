import React from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Platform,
} from "react-native";
import SystemConfig from "../../SystemConfig";
import { IsMobile } from "../config/constants";
import { DefaultBackgroundColor, DefaultMargin } from "../config/themeConfig";

export interface INativeLayoutProps {
  backgroundColor?: string;
  barStyle?: "default" | "light-content" | "dark-content";
  animated?: boolean;
  horizontalMargin?: boolean;
}

const NativeLayout: React.FunctionComponent<INativeLayoutProps> = (props) => {
  const {
    children,
    barStyle,
    animated,
    backgroundColor,
    horizontalMargin,
    ...rest
  } = props;

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: backgroundColor ?? DefaultBackgroundColor,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            marginHorizontal: horizontalMargin ? DefaultMargin : undefined,
          },
        ]}
      >
        <StatusBar
          backgroundColor={backgroundColor ?? DefaultBackgroundColor}
          barStyle={barStyle ?? "light-content"}
        />
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: DefaultMargin,
  },
  safeArea: {
    flex: IsMobile ? 1 : undefined,
    height: !IsMobile ? "100vh" : undefined,
  },
});

export default NativeLayout;
