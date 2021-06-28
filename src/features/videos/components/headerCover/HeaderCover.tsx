import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Platform, StatusBar, useWindowDimensions } from "react-native";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import { HeaderMenu } from "./HeaderMenu";

export default function HeaderCover() {
  const { height, width } = useWindowDimensions();

  return (
    <NativeView
      type="image"
      source={{
        uri: "https://quotessquare.com/wp-content/uploads/2019/04/teachers-day-background-hd-1280x720.jpg",
      }}
      height={height / 1.95}
      width={width}
      backgroundColor={AppTheme["color-grey"]}
    >
      <StatusBar translucent backgroundColor={"transparent"} />
      <NativeView
        type="gradient"
        colors={["#000000", "#00000000"]}
        height={120}
      >
        <HeaderMenu />
      </NativeView>
      <NativeView
        type="gradient"
        colors={["#00000000", "#00000000", "#0000009E", "#151215"]}
        height={120}
        width={width}
        position="absolute"
        bottom={0}
      ></NativeView>
    </NativeView>
  );
}
