import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Text,
  View,
} from "react-native";
import { Button, ButtonProps, Icon } from "react-native-elements";
import { AppTheme } from "../config/custom-theme";
import {
  AppFonts,
  DefaultBackgroundColor,
  DefaultBorderRadius,
  DefaultIconFamily,
  DefaultMargin,
  DefaultPrimaryColor,
  DefaultSecondaryColor,
  FontSize,
  IFontFamily,
  InputHeight,
} from "../config/themeConfig";
import _ from "lodash";
import Typography from "./Typography";
import NativeView, { IRippleProps } from "./NativeView";
import { Circle } from "react-native-progress";

interface IProps extends Partial<IRippleProps> {
  size?: ButtonSizes;
  fontFamily?: AppFonts;
  color?: string;
  title?: string;
  isLoading?: boolean;
  iconName?: string;
  buttonTextColor?: keyof typeof AppTheme;
  backgroundColor?: keyof typeof AppTheme;
  buttonFontFamily?: IFontFamily;
  leftText?: string | number;
  rightText?: string | number;
}

const NativeButton: React.FunctionComponent<IProps> = (props) => {
  const {
    onPress,
    size,
    fontFamily,
    color,
    title,
    children,
    isLoading,
    iconName,
    backgroundColor,
    buttonTextColor,
    buttonFontFamily,
    leftText,
    rightText,
    width,
    ...rest
  } = props;

  const textColor = buttonTextColor
    ? AppTheme[buttonTextColor]
    : backgroundColor
    ? DefaultSecondaryColor
    : DefaultBackgroundColor;
  return (
    <NativeView
      type={isLoading ? "default" : "ripple"}
      flexDirection="row"
      alignItems="center"
      justifyContent={
        (leftText || rightText) && !isLoading ? "space-between" : "center"
      }
      backgroundColor={
        backgroundColor ? AppTheme[backgroundColor] : DefaultSecondaryColor
      }
      height={ButtonSize[size as ButtonSizes]}
      borderRadius={DefaultBorderRadius}
      onPress={!isLoading && onPress}
      paddingHorizontal={DefaultMargin / 2}
      width={width}
      {...(rest as any)}
    >
      {isLoading ? (
        <Circle
          size={ButtonFontSize[size ?? "lg"]}
          color="white"
          indeterminate={true}
        />
      ) : (
        <>
          {iconName && (
            <NativeView marginRight={10} marginBottom={0.5}>
              <Icon
                type={DefaultIconFamily}
                name={iconName}
                color={textColor}
              />
            </NativeView>
          )}
          {title && (
            <Typography
              size={ButtonFontSize[size as ButtonSizes]}
              color={textColor}
              family={buttonFontFamily}
            >
              {title}
            </Typography>
          )}
          {leftText && (
            <Typography type="h3" color={textColor}>
              {leftText}
            </Typography>
          )}
          {rightText && (
            <Typography type="h3" color={textColor}>
              {rightText}
            </Typography>
          )}
        </>
      )}
    </NativeView>
  );
};

NativeButton.defaultProps = {
  size: "lg",
  buttonFontFamily: "medium",
};

type ButtonSizes = "lg" | "sm" | "xs";

const ButtonSize: Record<ButtonSizes, number> = {
  lg: InputHeight,
  sm: 43,
  xs: InputHeight / 2,
};

const ButtonFontSize: Record<ButtonSizes, number> = {
  lg: FontSize["h3x"],
  sm: FontSize["regular"],
  xs: FontSize["xsx"],
};

export default NativeButton;
