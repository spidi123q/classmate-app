import React from "react";
import Ripple from "react-native-material-ripple";
import { View, StyleSheet, Text } from "react-native";
import _ from "lodash";
import Typography from "./Typography";
import NativeLabel from "./NativeLabel";
import NativeTextInput, { INativeTextInput } from "./NativeTextInput";
import {
  DefaultBorderRadius,
  DefaultMargin,
  FontSize,
  InputHeight,
} from "../config/themeConfig";
import { Icon } from "react-native-elements";

interface IProps extends INativeTextInput {
  onPress(): any;
}
const NativeInput = (props: IProps) => {
  const { onPress, ...rest } = props;
  return (
    <Ripple
      style={styles.container}
      onPress={onPress}
      rippleContainerBorderRadius={DefaultBorderRadius}
      rippleSize={InputHeight}
    >
      <NativeTextInput {...rest} />
    </Ripple>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
});

export default NativeInput;
