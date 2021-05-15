import React from "react";
import { View, Image } from "react-native";
import NativeImage from "../../../../common/components/NativeImage";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { DefaultMargin, FontSize } from "../../../../common/config/themeConfig";
import ProductCard from "./ProductCard";
import styles from "./styles";

interface IProps {
  productImageRef: string;
  title: string;
  subHeading?: string;
  subHeading2?: string;
  marginVertical?: number;
}

export default function ProductHeader({
  productImageRef,
  subHeading,
  subHeading2,
  title,
  marginVertical,
}: IProps) {
  return (
    <NativeView style={[styles.headerBody, { marginVertical }]}>
      <View style={styles.headerTitleContainer}>
        <NativeImage style={styles.itemLogo} firebaseRef={productImageRef} />
        <View style={styles.titleContainer}>
          <Typography family="bold" size={FontSize.h2} color={"white"}>
            {title}
          </Typography>
          <Typography
            size={FontSize.regular}
            color="white"
            family="light"
            marginTop={DefaultMargin / 2}
            numberOfLines={1}
          >
            {subHeading}
          </Typography>
          <Typography
            size={FontSize.regular}
            color="white"
            marginTop={DefaultMargin / 2}
            numberOfLines={1}
          >
            {subHeading2}
          </Typography>
        </View>
      </View>
    </NativeView>
  );
}
