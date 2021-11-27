import React, { useState } from "react";
import {
  DefaultBackgroundColor,
  DefaultBorderRadius,
  DefaultFontColor,
  DefaultHintFontColor,
  DefaultMargin,
  DefaultSecondaryColor,
  InputHeight,
  SecondaryBackgroundColor,
} from "../config/themeConfig";
import NativeView, { INativeViewProps, IViewProps } from "./NativeView";
import Typography from "./Typography";
import Checked from "../assets/Checked/Checked.png";
import * as Animatable from "react-native-animatable";
import {
  bounceInProps,
  slideDownProps,
  slideUpProps,
  zoomInProps,
} from "../helpers/animation";

interface INativeCheckBoxProps {
  borderRadius?: number;
  onChange?: (value: boolean) => void;
  label: string;
  hint?: string;
  defaultValue?: boolean;
  value?: boolean;
}

export default function NativeCheckBox(props: INativeCheckBoxProps) {
  const { borderRadius, onChange, defaultValue, label, hint } = props;
  const [isChecked, setIsChecked] = useState<boolean>(!!defaultValue);
  const value: boolean = props.value ?? isChecked;
  const checkboxProps: Partial<IViewProps> = value
    ? {
        backgroundColor: DefaultSecondaryColor,
      }
    : {
        borderColor: DefaultSecondaryColor,
        borderWidth: 1,
      };

  const onToggleCheck = () => {
    const value = !isChecked;
    setIsChecked(value);
    onChange && onChange(value);
  };

  return (
    <NativeView
      type="ripple"
      height={InputHeight}
      backgroundColor={SecondaryBackgroundColor}
      alignItems="center"
      padding={DefaultMargin / 2}
      onPress={onToggleCheck}
      borderRadius={borderRadius ?? DefaultBorderRadius}
      flexDirection="row"
    >
      <NativeView
        height={checkboxSize}
        width={checkboxSize}
        borderRadius={3}
        justifyContent="center"
        alignItems="center"
        {...checkboxProps}
      >
        {value && <Animatable.Image source={Checked} {...zoomInProps()} />}
      </NativeView>
      <NativeView
        marginLeft={DefaultMargin / 2}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flex={1}
      >
        <Typography family="medium" type="h3">
          {label}
        </Typography>
        {hint && (
          <Typography
            family="medium"
            type="xregular"
            color={DefaultHintFontColor}
          >
            {hint}
          </Typography>
        )}
      </NativeView>
    </NativeView>
  );
}

const checkboxSize: number = 22;
