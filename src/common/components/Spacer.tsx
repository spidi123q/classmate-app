import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { DefaultMargin } from "../config/themeConfig";

interface IProps {
  height?: number;
}
export const VericalSpacer = (props: IProps) => {
  const { height } = props;
  return <View style={{ paddingVertical: height ?? DefaultMargin }}></View>;
};
