import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Text,
  View,
} from "react-native";
import { Button, ButtonProps } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import { AppTheme } from "../config/custom-theme";
import {
  AppFonts,
  DefaultBorderRadius,
  FontSize,
  InputHeight,
} from "../config/themeConfig";
import _ from "lodash";
import LinearGradient from "react-native-linear-gradient";
import Typography from "./Typography";
import NativeView from "./NativeView";
import { Circle } from "react-native-progress";

interface IProps extends ButtonProps {
  size?: ButtonSizes;
  width?: number;
  height?: number;
  mode?: ModeTypes;
  margin?: number;
  fontFamily?: AppFonts;
  color?: string;
  title?: string;
  isLoading?: boolean;
}

const NativeButton: React.FunctionComponent<IProps> = (props) => {
  const {
    onPress,
    size,
    width,
    margin,
    fontFamily,
    color,
    buttonStyle,
    title,
    height,
    children,
    isLoading,
    ...rest
  } = props;
  const mode = props.mode ?? "oval";
  const customStyle: any = {};
  if (width) {
    customStyle.width = width;
  }
  if (height) {
    customStyle.height = height;
  }
  return (
    <NativeView
      type={isLoading ? "default" : "ripple"}
      onPress={onPress}
      rippleContainerBorderRadius={500}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[
          AppTheme["color-primary-500"],
          AppTheme["color-secondary-dark"],
        ]}
        style={[getButtonStyle(mode, size), buttonStyle, customStyle]}
      >
        {children ??
          (!isLoading && (
            <Typography color="white" size={ButtonFontSize[size ?? "lg"]}>
              {title}
            </Typography>
          ))}
        {isLoading && (
          <Circle
            size={ButtonFontSize[size ?? "lg"]}
            color="white"
            indeterminate={true}
          />
        )}
      </LinearGradient>
    </NativeView>
  );
};

const getButtonStyle = (
  mode?: ModeTypes,
  size?: ButtonSizes
): StyleProp<ViewStyle> => {
  let style: StyleProp<ViewStyle> = {
    height: ButtonSize[size ?? "lg"],
    justifyContent: "center",
    alignItems: "center",
  };
  if (mode === "oval") {
    return {
      ...style,
      borderRadius: DefaultBorderRadius * 100,
    };
  } else if (mode === "square") {
    return {
      ...style,
      borderRadius: DefaultBorderRadius,
    };
  } else {
    return style;
  }
};

type ModeTypes = "oval" | "square";

type ButtonSizes = "lg" | "sm" | "xs";

const ButtonSize: Record<ButtonSizes, number> = {
  lg: InputHeight,
  sm: InputHeight / 1,
  xs: InputHeight / 2,
};

const ButtonFontSize: Record<ButtonSizes, number> = {
  lg: FontSize["h2"],
  sm: FontSize["regular"],
  xs: FontSize["xs"],
};

export default NativeButton;
