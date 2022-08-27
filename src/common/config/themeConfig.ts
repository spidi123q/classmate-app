import { Platform } from "react-native";
import { AppTheme } from "./custom-theme";

export type FontType =
  | "h1x"
  | "h1"
  | "h2"
  | "h3"
  | "h3x"
  | "regular"
  | "xsx"
  | "xs";

export type IFontFamily = "light" | "regular" | "medium" | "bold" | "ultaLight";

export const FontSize: Record<FontType, number> = {
  h1x: 30,
  h1: 24,
  h2: 20,
  h3x: 18,
  h3: 16,
  regular: 15,
  xsx: 13,
  xs: 11,
};

export enum AppFonts {
  regular = "HelveticaNeue",
  light = "HelveticaNeue-Light",
  ultaLight = "HelveticaNeue-UltraLight",
  bold = "HelveticaNeue-Bold",
  medium = "HelveticaNeue-Medium",
}

export const DefaultFontLight: AppFonts = AppFonts.ultaLight;
export const DefaultFontBold: AppFonts = AppFonts.regular;
export const DefaultFont: AppFonts = AppFonts.light;

export const InputHeight: number = 62;
export const InputFontSize: number = 16;
export const DefaultMargin: number = 25;
export const DefaultThumbnailSize: number = 105;
export const DefaultBorderRadius: number = 6;
export const ICON_SIZE: number = 30;
export const DefaultInputFontSize: number = FontSize.h3;
export const DescriptionLineHeight: number = 25;
export const SubTextLineHeight: number = 19;
export const DoubleMargin: number = DefaultMargin * 2;

export const FontFamily: Record<IFontFamily, AppFonts> = {
  light: AppFonts.light,
  regular: AppFonts.regular,
  medium: AppFonts.medium,
  ultaLight: AppFonts.ultaLight,
  bold: AppFonts.bold,
};

export enum IconFamily {
  Ionicon = "ionicon",
  Material = "material",
}

export const DefaultBackgroundColor: string = AppTheme["color-secondary"];
export const DefaultPrimaryColor: string = AppTheme["color-primary"];
export const DefaultFontColor: string = AppTheme["color-primary"];
export const DefaultHintFontColor: string = AppTheme["color-grey"];
export const DefaultSecondaryColor: string = AppTheme["color-secondary"];
export const SecondaryBackgroundColor: string = AppTheme["color-primary2"];
export const TrasparentColor: string = "rgba(255, 0, 0, 0)";
export const DefaultPlaceholderBackgroudColor = undefined;
export const DefaultPlaceholderHighlightColor = undefined;

export const DefaultOpacity: number = 0.65;

export const SecondaryOpacity: number = 0.63;

export const DefaultIconFamily: IconFamily = IconFamily.Ionicon;
export const DefaultLoaderHeight: number = 100;

export const DefaultLogoHeight: number = 40;
export const DefaultLogoWidth: number = 68;
export const DefaultAvatarSize: number = 35;

export const PageBorderRadius: number = DefaultBorderRadius * 4;

export const DefaultShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 7.49,

  elevation: Platform.OS == "android" ? 7 : 1,
};
