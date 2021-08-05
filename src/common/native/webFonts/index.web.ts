import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Fonts/Ionicons.ttf";
import HelveticaNeue from "../../assets/fonts/HelveticaNeue.otf";
import HelveticaNeueUltraLight from "../../assets/fonts/HelveticaNeue-UltraLight.otf";
import HelveticaNeueMedium from "../../assets/fonts/HelveticaNeue-Medium.otf";
import HelveticaNeueLight from "../../assets/fonts/HelveticaNeue-Light.otf";
import HelveticaNeueBold from "../../assets/fonts/HelveticaNeue-Bold.otf";

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
      src: url(${HelveticaNeue});
      font-family: HelveticaNeue;
    }

    @font-face {
      src: url(${HelveticaNeueUltraLight});
      font-family: HelveticaNeue-UltraLight;
    }

    @font-face {
      src: url(${HelveticaNeueMedium});
      font-family: HelveticaNeue-Medium;
    }

    @font-face {
      src: url(${HelveticaNeueLight});
      font-family: HelveticaNeue-Light;
    }

    @font-face {
      src: url(${HelveticaNeueBold});
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
