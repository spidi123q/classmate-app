import React from "react";
import { StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
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
      style={{
        ...styles.safeArea,
        backgroundColor: backgroundColor ?? DefaultBackgroundColor,
      }}
    >
      <View
        style={[
          styles.container,
          {
            marginHorizontal: horizontalMargin ? DefaultMargin * 2 : undefined,
          },
        ]}
      >
        <StatusBar
          backgroundColor={backgroundColor ?? DefaultBackgroundColor}
          barStyle={barStyle ?? "dark-content"}
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
    marginTop: DefaultMargin * 2,
  },
  safeArea: {
    flex: 1,
  },
});

export default NativeLayout;
