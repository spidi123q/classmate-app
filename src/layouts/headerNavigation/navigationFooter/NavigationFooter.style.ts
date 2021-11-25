import { Platform, StyleSheet } from "react-native";
import { AppTheme } from "../../../common/config/custom-theme";
import {
  AppFonts,
  DefaultBackgroundColor,
  DefaultFontColor,
  DefaultMargin,
  DefaultSecondaryColor,
  DoubleMargin,
  FontSize,
  ICON_SIZE,
  SecondaryFontColor,
} from "../../../common/config/themeConfig";

export let TAB_HEIGHT: number = 43;
const ICON_HIGHLIGHT_WIDTH: number = ICON_SIZE * 3 * 0.75;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppTheme["color-primary-shade"],
    height: TAB_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1,
    marginHorizontal: DefaultMargin,
    borderRadius: 9,
  },
  icon: {},
  iconContainer: {
    height: TAB_HEIGHT - 10,
    width: ICON_HIGHLIGHT_WIDTH,
    justifyContent: "center",
    flex: 1,
  },
  iconContainerHightlight: {
    backgroundColor: DefaultSecondaryColor,
    borderRadius: 7,
  },
  titleText: {
    textAlign: "center",
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
