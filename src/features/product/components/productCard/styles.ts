import { Platform, StyleSheet } from "react-native";
import {
  DefaultBackgroundColor,
  DefaultBorderRadius,
  DefaultMargin,
  SecondaryBackgroundColor,
} from "../../../../common/config/themeConfig";

export const cardBorderRadius: number = DefaultBorderRadius + 2;
const ItemLogoSize: number = 60;
export const FooterLogoSize: number = 40;

const styles = StyleSheet.create({
  container: {
    borderRadius: cardBorderRadius,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7.49,

    elevation: Platform.OS == "android" ? 7 : 1,
    margin: DefaultMargin,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopLeftRadius: cardBorderRadius,
    borderTopRightRadius: cardBorderRadius,
  },
  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyContainer: {
    //height: 150,
    backgroundColor: SecondaryBackgroundColor,
  },
  footerContainer: {
    borderBottomLeftRadius: cardBorderRadius,
    borderBottomRightRadius: cardBorderRadius,
  },
  nextIcon: {
    opacity: 0.3,
  },
  headerLogoContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    maxWidth: 100,
    margin: DefaultMargin / 2,
  },
  logo: {
    margin: DefaultMargin,
  },
  headerBody: {
    flex: 1,
    justifyContent: "center",
    marginLeft: DefaultMargin * 2,
  },
  itemLogo: {
    height: ItemLogoSize,
    width: ItemLogoSize,
    borderRadius: ItemLogoSize / 2,
    borderWidth: 1,
    borderColor: "white",
  },
  headerTitleContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    marginLeft: DefaultMargin * 2,
    justifyContent: "center",
  },
  footerLogo: {
    height: FooterLogoSize,
    width: FooterLogoSize * 2,
  },
  footerBody: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: DefaultMargin * 2,
    marginVertical: DefaultMargin,
  },
  sellerHeaderContainer: {
    alignItems: "center",
    flex: 1,
    height: FooterLogoSize + 20,
    justifyContent: "center",
  },
  bodyLogoContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  sellerFooterContainer: {
    margin: DefaultMargin * 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sellerCountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsFooterContainer: {
    height: DefaultMargin,
  },
});

export default styles;
