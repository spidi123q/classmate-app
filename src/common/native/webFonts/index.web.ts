import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Fonts/Ionicons.ttf";
import MaterialIcons from "react-native-vector-icons/Fonts/Ionicons.ttf";

/**
 * insert font icons for web
 */
export const initWebFonts = () => {
  if (Platform.OS === "web") {
    const iconFontStyles = `@font-face {
      src: url(${Ionicons});
      font-family: Ionicons;
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
