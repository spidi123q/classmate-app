import { DefaultPageSize } from "../config/constants";
import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";

interface IProps {
  count?: number;
  flexDirection?: "row" | "column";
  Component: () => JSX.Element;
}
const SkeletonList: React.FunctionComponent<IProps> = (props) => {
  const { Component, flexDirection } = props;
  const count: number = props.count ?? DefaultPageSize;
  const arr: any[] = new Array(count).fill(0);
  return (
    <View style={[styles.container, { flexDirection }]}>
      {arr.map((item, index) => (
        <Component key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
});

export default SkeletonList;
