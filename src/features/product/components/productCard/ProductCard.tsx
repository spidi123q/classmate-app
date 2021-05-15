import React from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AppTheme } from "../../../../common/config/custom-theme";
import Logo from "../../../../common/assets/Logo.svg";
import { Icon } from "react-native-elements";
import {
  DefaultBackgroundColor,
  DefaultBorderRadius,
  DefaultIconFamily,
  DefaultLogoHeight,
  DefaultLogoWidth,
  DefaultMargin,
  DefaultOpacity,
  FontSize,
  SecondaryBackgroundColor,
} from "../../../../common/config/themeConfig";
import Typography from "../../../../common/components/Typography";
import styles, { cardBorderRadius } from "./styles";
import Counter from "../../../../common/components/Counter";
import { ShimmerPlaceHolder } from "../../../../common/config/constants";
import NativeView from "../../../../common/components/NativeView";

interface IProps {
  footerBG?: boolean;
  headerBG?: boolean;
  noHeaderLogo?: boolean;
  noBodyLogo?: boolean;
  headerBody?: JSX.Element;
  subHeaderBody?: JSX.Element;
  footerBody?: JSX.Element;
  body?: JSX.Element;
  onViewMore?: () => any;
}

function ProductCard(props: IProps) {
  const {
    footerBG,
    headerBody,
    footerBody,
    noHeaderLogo,
    headerBG,
    noBodyLogo,
    subHeaderBody,
    body,
    onViewMore,
  } = props;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={headerBG ? gradientBG : plainBG}
        style={styles.headerContainer}
      >
        {headerBody}
        {!noHeaderLogo && (
          <View style={styles.headerLogoContainer}>
            <Icon
              size={30}
              type={DefaultIconFamily}
              name="chevron-forward-outline"
              color="#FFFFFF"
              iconStyle={styles.nextIcon}
              onPress={onViewMore}
            />
            <Logo
              height={DefaultLogoHeight}
              width={DefaultLogoWidth}
              opacity={logoOpacity}
              style={styles.logo}
            />
          </View>
        )}
      </LinearGradient>
      <LinearGradient colors={gradientBG} style={styles.subHeaderContainer}>
        {subHeaderBody}
      </LinearGradient>
      <View style={styles.bodyContainer}>
        {body}
        {!noBodyLogo && (
          <View style={styles.bodyLogoContainer}>
            <Logo
              height={bodyLogoHeight}
              width={bodyLogoWidth}
              opacity={logoOpacity}
              style={styles.logo}
            />
          </View>
        )}
      </View>
      <LinearGradient
        colors={footerBG ? gradientBG : plainBG}
        style={styles.footerContainer}
      >
        {footerBody}
      </LinearGradient>
    </View>
  );
}
const gradientBG = [
  AppTheme["color-primary-500"],
  AppTheme["color-secondary-dark"],
];
const plainBG = [SecondaryBackgroundColor, SecondaryBackgroundColor];

const logoOpacity = "0.15";
const bodyLogoHeight = 24;
const bodyLogoWidth = 41;

export default React.memo(ProductCard);
