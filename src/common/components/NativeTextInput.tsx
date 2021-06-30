import React from "react";
import { TextInput, StyleSheet, View, TextInputProps } from "react-native";
import { Icon } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import { AppTheme } from "../config/custom-theme";
import {
  AppFonts,
  DefaultBackgroundColor,
  DefaultBorderRadius,
  DefaultFont,
  DefaultFontColor,
  DefaultFontLight,
  DefaultIconFamily,
  DefaultMargin,
  FontFamily,
  FontSize,
  InputFontSize,
  InputHeight,
  SecondaryBackgroundColor,
} from "../config/themeConfig";
import NativeLabel from "./NativeLabel";
import Typography from "./Typography";

export interface INativeTextInput extends TextInputProps {
  iconName?: string;
  size?: InputSize;
  label?: string;
  onPress?: () => any;
}
function NativeTextInput(props: INativeTextInput, ref: any) {
  const { iconName, size, label, onPress, ...rest } = props;

  const inputItem = (
    <>
      {iconName && (
        <Icon
          style={styles.icon}
          size={FontSize.h2}
          type={DefaultIconFamily}
          name={iconName}
        />
      )}
      <TextInput
        ref={ref}
        style={StyleSheet.flatten([
          styles.inputContainer,
          {
            height: TextInputSize[size ?? "regular"],
          },
        ])}
        placeholderTextColor={AppTheme["color-dark"]}
        {...rest}
      />
    </>
  );
  return (
    <NativeLabel label={label}>
      {onPress && (
        <Ripple
          onPress={onPress}
          rippleContainerBorderRadius={7}
          style={styles.container}
        >
          {inputItem}
        </Ripple>
      )}
      {!onPress && <View style={styles.container}>{inputItem}</View>}
    </NativeLabel>
  );
}

type InputSize = "regular" | "sm" | "lg";

export const TextInputSize: Record<InputSize, number> = {
  sm: InputHeight - 10,
  regular: InputHeight,
  lg: InputHeight + 10,
};

const styles = StyleSheet.create({
  inputContainer: {
    // backgroundColor: "#2C2C2C",
    fontFamily: FontFamily.regular,
    paddingLeft: InputFontSize,
    fontSize: FontSize.regular,
    color: DefaultFontColor,
    flex: 1,
  },
  icon: {
    marginLeft: DefaultMargin,
  },
  container: {
    backgroundColor: SecondaryBackgroundColor,
    borderRadius: DefaultBorderRadius,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default React.forwardRef(NativeTextInput);
