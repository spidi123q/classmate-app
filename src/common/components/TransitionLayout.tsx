import NativeLayout, { INativeLayoutProps } from "./NativeLayout";
import React, { useEffect, useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { animate } from "../helpers/animation";

interface IProps extends INativeLayoutProps {}
const TransitionLayout: React.FunctionComponent<IProps> = (props) => {
  const { children, ...rest } = props;
  const viewRef = useRef<any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && viewRef.current && animate("slideInUp", viewRef, 200);
  }, [isFocused]);

  return (
    <Animatable.View
      ref={(ref) => (viewRef.current = ref)}
      style={styles.container}
      useNativeDriver
    >
      <NativeLayout {...rest}>{children}</NativeLayout>
    </Animatable.View>
  );
};

export default TransitionLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
