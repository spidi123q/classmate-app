import React from "react";
import { Icon } from "react-native-elements";
import { Circle } from "react-native-progress";
import { AppTheme } from "../config/custom-theme";
import {
  DefaultIconFamily,
  DefaultMargin,
  DefaultShadow,
  FontSize,
  SecondaryBackgroundColor,
} from "../config/themeConfig";
import NativeView from "./NativeView";
import Typography from "./Typography";

interface IProps {
  size?: number;
  children?: JSX.Element;
  label?: string;
  iconName?: string;
  iconColor?: string;
  gradient?: boolean;
  onPress?: () => any;
  isLoading?: boolean;
}

export default function IconButton({
  size,
  children,
  label,
  iconName,
  iconColor,
  gradient,
  onPress,
  isLoading,
}: IProps) {
  const defaultSize = size ?? 55;

  return (
    <NativeView
      justifyContent="center"
      alignItems="center"
      height={defaultSize}
      width={defaultSize}
      borderRadius={defaultSize}
    >
      <NativeView
        backgroundColor={SecondaryBackgroundColor}
        height={defaultSize}
        width={defaultSize}
        borderRadius={defaultSize}
        justifyContent="center"
        alignItems="center"
        style={{
          ...DefaultShadow,
          shadowOpacity: 0.3,
          shadowRadius: 3.49,
          borderRadius: defaultSize,
        }}
        type={"default"}
      >
        <NativeView
          type={onPress && !isLoading ? "ripple" : "default"}
          rippleContainerBorderRadius={defaultSize * 2}
          height={defaultSize}
          width={defaultSize}
          borderRadius={defaultSize}
          flex={1}
          justifyContent="center"
          alignItems="center"
          onPress={isLoading ? undefined : onPress}
        >
          {children ??
            (!isLoading && (
              <Icon
                type={DefaultIconFamily}
                name={iconName ?? ""}
                size={defaultSize - defaultSize * 0.4}
                color={iconColor}
              />
            ))}
          {isLoading && (
            <Circle
              size={defaultSize - defaultSize * 0.4}
              color="white"
              indeterminate={true}
            />
          )}
        </NativeView>
      </NativeView>
      {label && (
        <Typography marginTop={DefaultMargin} size={FontSize.xs + 1}>
          {label}
        </Typography>
      )}
    </NativeView>
  );
}
