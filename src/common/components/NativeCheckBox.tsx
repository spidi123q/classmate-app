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

export interface INativeCheckBoxProps {
  borderRadius?: number;
  onChange: (value: boolean) => void;
  label: string;
  hint?: string;
  defaultValue?: boolean;
  checked?: boolean;
}

export default function NativeCheckBox(props: INativeCheckBoxProps) {
  const { borderRadius, onChange, defaultValue, label, hint, checked } = props;
  const checkboxProps: Partial<IViewProps> = checked
    ? {
        backgroundColor: DefaultSecondaryColor,
      }
    : {
        borderColor: DefaultSecondaryColor,
        borderWidth: 1,
      };

  const onToggleCheck = () => {
    onChange(!checked);
  };

  return (
    <NativeView
      type="ripple"
      height={InputHeight}
      backgroundColor={SecondaryBackgroundColor}
      alignItems="center"
      padding={DefaultMargin / 2}
      onPress={onToggleCheck}
      borderRadius={borderRadius ?? 10}
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
        {checked && <Animatable.Image source={Checked} {...zoomInProps()} />}
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
