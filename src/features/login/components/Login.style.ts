import { StyleSheet } from "react-native";
import { DefaultFontBold } from "../../../common/config/themeConfig";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 350,
  },
  formContainer: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  mainContainer: {
    alignItems: "center",
    flex: 1,
  },
});

export default styles;
