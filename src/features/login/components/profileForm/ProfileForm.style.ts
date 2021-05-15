import { StyleSheet } from "react-native";
import {
  DefaultBackgroundColor,
  DefaultMargin,
  SecondaryBackgroundColor,
} from "../../../../common/config/themeConfig";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 350,
    marginTop: DefaultMargin * 4,
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
  bottomLogoContainer: {
    height: 150,
    width: "100%",
    marginBottom: -DefaultMargin,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: SecondaryBackgroundColor,
  },
});
export default styles;
