import React from "react";
import { View, Image } from "react-native";
import NativeImage from "../../../../common/components/NativeImage";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { DefaultMargin, FontSize } from "../../../../common/config/themeConfig";
import styles, { FooterLogoSize } from "./styles";

interface IProps {
  logoRef: string;
  height?: number;
  logoHeight?: number;
  onPress?: () => any;
}

export default function ProductTitle({
  logoRef,
  height,
  logoHeight,
  onPress,
}: IProps) {
  const imageHeight = logoHeight ?? FooterLogoSize;
  return (
    <NativeView
      type={onPress ? "ripple" : "default"}
      style={[styles.sellerHeaderContainer, { height: height ?? 60 }]}
      onPress={onPress}
    >
      <NativeImage
        height={imageHeight}
        width={imageHeight * 2}
        resizeMode="center"
        firebaseRef={logoRef}
      />
    </NativeView>
  );
}
