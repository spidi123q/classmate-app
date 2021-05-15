import { StyleSheet } from "react-native";
import {
  DefaultMargin,
  DoubleMargin,
} from "../../../../common/config/themeConfig";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: DoubleMargin,
  },
  otp: {
    height: 80,
  },
  codeInputField: {
    color: "black",
  },
});

export default styles;
