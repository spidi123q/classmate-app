import React, { useEffect } from "react";
import {
  ThemeProvider as ElementsThemeProvider,
  Theme,
} from "react-native-elements";
import SplashScreen from "react-native-splash-screen";
import { AppTheme } from "../common/config/custom-theme";
import BackgroundColor from "@codebet/react-native-background-color";
import { Platform, SafeAreaView } from "react-native";
import { DefaultBackgroundColor } from "../common/config/themeConfig";

const elementsTheme: Theme = {
  colors: {
    primary: AppTheme["color-primary-500"],
    secondary: AppTheme["color-dark"],
  },
};

const ThemeProvider: React.FunctionComponent = (props) => {
  const { children } = props;

  useEffect(() => {
    SplashScreen.hide();
    Platform.OS === "android" &&
      BackgroundColor.setColor(DefaultBackgroundColor);
  }, []);

  return (
    <>
      <ElementsThemeProvider theme={elementsTheme}>
        {children}
      </ElementsThemeProvider>
    </>
  );
};

export default ThemeProvider;
