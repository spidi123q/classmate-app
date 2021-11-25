import { Platform, StyleSheet } from "react-native";
import {
  AppFonts,
  DefaultBackgroundColor,
  DefaultMargin,
  DoubleMargin,
  FontSize,
} from "../../common/config/themeConfig";

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultBackgroundColor,
  },
  headerIcons: {
    marginRight: DoubleMargin,
  },
});

export default styles;
