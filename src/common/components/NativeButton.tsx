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
  DefaultFontColor,
  DefaultIconFamily,
  DefaultPrimaryColor,
  DefaultSecondaryColor,
  FontSize,
  InputHeight,
} from "../config/themeConfig";
import _ from "lodash";
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
  iconName?: string;
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
    iconName,
    ...rest
  } = props;
  const mode = props.mode;
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
      rippleContainerBorderRadius={DefaultBorderRadius}
    >
      <View style={[getButtonStyle(mode, size), buttonStyle, customStyle]}>
        {children ??
          (!isLoading && (
            <NativeView flexDirection="row" alignItems="center">
              {iconName && (
                <NativeView marginRight={10} marginBottom={0.5}>
                  <Icon type={DefaultIconFamily} name={iconName} />
                </NativeView>
              )}
              <Typography
                size={ButtonFontSize[size ?? "lg"]}
                color={DefaultFontColor}
                family="medium"
              >
                {title}
              </Typography>
            </NativeView>
          ))}
        {isLoading && (
          <Circle
            size={ButtonFontSize[size ?? "lg"]}
            color="white"
            indeterminate={true}
          />
        )}
      </View>
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
    backgroundColor: DefaultSecondaryColor,
    borderRadius: DefaultBorderRadius,
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
  sm: 43,
  xs: InputHeight / 2,
};

const ButtonFontSize: Record<ButtonSizes, number> = {
  lg: FontSize["h3x"],
  sm: FontSize["regular"],
  xs: FontSize["xs"],
};

export default NativeButton;
