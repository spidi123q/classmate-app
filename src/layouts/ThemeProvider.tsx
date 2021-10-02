import React, { useEffect } from "react";
import {
  ThemeProvider as ElementsThemeProvider,
  Theme,
} from "react-native-elements";
import SplashScreen from "react-native-splash-screen";
import { AppTheme } from "../common/config/custom-theme";
import { Platform, SafeAreaView } from "react-native";
import BackgroundColor from "@codebet/react-native-background-color";
import { DefaultBackgroundColor } from "../common/config/themeConfig";
import { initWebFonts } from "../common/native/webFonts";

const elementsTheme: Theme = {
  colors: {
    primary: AppTheme["color-primary"],
    secondary: AppTheme["color-secondary"],
  },
};

const ThemeProvider: React.FunctionComponent = (props) => {
  const { children } = props;

  useEffect(() => {
    if (Platform.OS !== "web") {
      SplashScreen.hide();
    }
    BackgroundColor.setColor(DefaultBackgroundColor);
    initWebFonts();
  }, []);

  return (
    <ElementsThemeProvider theme={elementsTheme}>
      {children}
    </ElementsThemeProvider>
  );
};

export default ThemeProvider;
