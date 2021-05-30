import { Platform } from "react-native";
import { AppTheme } from "./custom-theme";

export type FontType = "h1x" | "h1" | "h2" | "h3" | "h3x" | "regular" | "xs";

export type IFontFamily =
  | "light"
  | "regular"
  | "medium"
  | "semiBold"
  | "bold"
  | "extraBold";

export const FontSize: Record<FontType, number> = {
  h1x: 28,
  h1: 24,
  h2: 20,
  h3x: 17,
  h3: 14,
  regular: 14,
  xs: 11,
};

export enum AppFonts {
  GilroyRegular = "Gilroy-Regular",
  GilroyLight = "Gilroy-Light",
  GilroyExtraBold = "Gilroy-ExtraBold",
  GilroyBold = "Gilroy-Bold",
  GilroySemiBold = "Gilroy-SemiBold",
  GilroyMedium = "Gilroy-Medium",
}

export const DefaultFontLight: string = AppFonts.GilroyLight;
export const DefaultFontBold: string = AppFonts.GilroyBold;
export const DefaultFont: string = AppFonts.GilroyMedium;

export const InputHeight: number = 50;
export const InputFontSize: number = 16;
export const DefaultMargin: number = 10;
export const DefaultThumbnailSize: number = 105;
export const DefaultBorderRadius: number = 8;
export const ICON_SIZE: number = 30;
export const DefaultInputFontSize: number = FontSize.h3;

export const DoubleMargin: number = DefaultMargin * 2;

export const FontFamily: Record<IFontFamily, string> = {
  light: DefaultFontLight,
  regular: DefaultFont,
  medium: AppFonts.GilroyMedium,
  semiBold: AppFonts.GilroySemiBold,
  bold: DefaultFontBold,
  extraBold: AppFonts.GilroyExtraBold,
};

export enum IconFamily {
  Ionicon = "ionicon",
  Material = "material",
}

export const DefaultBackgroundColor: string = "#F6F6F6";
export const DefaultPrimaryColor: string = AppTheme["color-primary-500"];
export const DefaultFontColor: string = AppTheme["color-black"];
export const SecondaryBackgroundColor: string = "white";
export const TrasparentColor: string = "rgba(255, 0, 0, 0)";

export const DefaultOpacity: number = 68;

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
