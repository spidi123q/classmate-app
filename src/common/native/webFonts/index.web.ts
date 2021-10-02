import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Fonts/Ionicons.ttf";
import HelveticaNeue from "../../assets/fonts/HelveticaNeue.woff2";
import HelveticaNeueUltraLight from "../../assets/fonts/HelveticaNeue-UltraLight.woff2";
import HelveticaNeueMedium from "../../assets/fonts/HelveticaNeue-Medium.woff2";
import HelveticaNeueLight from "../../assets/fonts/HelveticaNeue-Light.woff2";
import HelveticaNeueBold from "../../assets/fonts/HelveticaNeue-Bold.woff2";

/**
 * insert font icons for web
 */
export const initWebFonts = () => {
  if (Platform.OS === "web") {
    const iconFontStyles = `@font-face {
      src: url(${Ionicons});
      font-family: Ionicons;
    }

    @font-face {
      src: url(${HelveticaNeue}) format('woff2');
      font-family: HelveticaNeue;
    }

    @font-face {
      src: url(${HelveticaNeueUltraLight}) format('woff2');
      font-family: HelveticaNeue-UltraLight;
    }

    @font-face {
      src: url(${HelveticaNeueMedium}) format('woff2');
      font-family: HelveticaNeue-Medium;
    }

    @font-face {
      src: url(${HelveticaNeueLight}) format('woff2');
      font-family: HelveticaNeue-Light;
    }

    @font-face {
      src: url(${HelveticaNeueBold}) format('woff2');
      font-family: HelveticaNeue-Bold;
    }
    `;
    // Create stylesheet
    const style: any = document.createElement("style");
    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = iconFontStyles;
    } else {
      style.appendChild(document.createTextNode(iconFontStyles));
    }
    // Inject stylesheet
    document.head.appendChild(style);
  }
};
