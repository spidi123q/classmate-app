import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Platform, StatusBar, useWindowDimensions } from "react-native";
import NativeButton from "../../../../common/components/NativeButton";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import { HeaderMenu } from "./HeaderMenu";
import Live from "../../assets/Live.svg";
import {
  DefaultMargin,
  DefaultOpacity,
  SecondaryOpacity,
} from "../../../../common/config/themeConfig";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

interface IProps {
  isLoading?: boolean;
}

export default function HeaderCover(props: IProps) {
  const { isLoading } = props;
  const { height, width } = useWindowDimensions();
  const coverHeight = height / 1.95;

  if (isLoading) {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width={width} height={coverHeight} />
      </SkeletonPlaceholder>
    );
  }
  return (
    <NativeView
      type="image"
      source={{
        uri: "https://quotessquare.com/wp-content/uploads/2019/04/teachers-day-background-hd-1280x720.jpg",
      }}
      height={coverHeight}
      width={width}
      backgroundColor={AppTheme["color-grey"]}
    >
      <StatusBar translucent backgroundColor={"transparent"} />
      <NativeView
        type="gradient"
        colors={["#000000", "#00000000"]}
        height={150}
      >
        <HeaderMenu />
      </NativeView>
      <NativeView
        type="gradient"
        colors={["#00000000", "#00000000", "#0000009E", "#151215"]}
        height={250}
        width={width}
        position="absolute"
        bottom={0}
        justifyContent="flex-end"
      >
        <NativeView marginHorizontal={DefaultMargin}>
          <NativeView marginBottom={DefaultMargin / 2}>
            <Typography opacity={DefaultOpacity} type="xs">
              STD 10 · PHYSICS
            </Typography>
            <Typography family="medium" type="h3x">
              Basic of Electromagnetic Induction
            </Typography>
          </NativeView>
          <NativeView
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <NativeButton
              width={175}
              title="Play Now"
              size="sm"
              iconName="videocam"
            />
            <Live />
          </NativeView>
        </NativeView>
      </NativeView>
    </NativeView>
  );
}
