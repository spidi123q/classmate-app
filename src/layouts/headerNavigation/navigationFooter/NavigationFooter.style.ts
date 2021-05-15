import { Platform, StyleSheet } from "react-native";
import { AppTheme } from "../../../common/config/custom-theme";
import {
  AppFonts,
  DefaultBackgroundColor,
  DefaultFontColor,
  DefaultMargin,
  DoubleMargin,
  FontSize,
  ICON_SIZE,
} from "../../../common/config/themeConfig";

export let TAB_HEIGHT: number = 35;
const ICON_HIGHLIGHT_WIDTH: number = ICON_SIZE * 3 * 0.75;

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultBackgroundColor,
    height: TAB_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1,
    borderBottomColor: AppTheme["color-grey"],
    borderBottomWidth: 1,
  },
  icon: {},
  iconContainer: {
    height: TAB_HEIGHT,
    width: ICON_HIGHLIGHT_WIDTH,
    justifyContent: "center",
    flex: 1,
  },
  iconContainerHightlight: {
    borderBottomColor: AppTheme["color-primary-500"],
    borderStyle: "solid",
    borderBottomWidth: 2,
  },
  titleText: {
    fontSize: FontSize.h3x,
    color: DefaultFontColor,
    fontFamily: AppFonts.GilroySemiBold,
    opacity: 0.6,
    textAlign: "center",
    //backgroundColor: "red",
  },
});

export const iconHighLight = (isActive: boolean) =>
  StyleSheet.flatten(
    isActive
      ? [styles.icon, { color: AppTheme["color-primary-500"] }]
      : styles.icon
  );

export const borderHighLight = (isActive: boolean) =>
  StyleSheet.flatten(
    isActive
      ? [styles.iconContainer, styles.iconContainerHightlight]
      : styles.iconContainer
  );
export const textHighLight = (isActive: boolean) =>
  StyleSheet.flatten(
    isActive ? [styles.titleText, { opacity: 1 }] : styles.titleText
  );

export default styles;
