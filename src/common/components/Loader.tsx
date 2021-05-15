import React from "react";
import { StyleSheet, View, Text, ViewProps } from "react-native";
import LottieView from "lottie-react-native";
import { DefaultLoaderHeight } from "../config/themeConfig";

interface IProp extends ViewProps {
  type?: "success" | "payment-success" | "loader" | "empty" | "default";
  loop?: boolean;
  size?: number;
  onAnimationFinish?: (isCancelled: boolean) => void;
}
const Loader = (props: IProp) => {
  const { type, size: inputSize, style, ...rest } = props;
  const size = inputSize ?? DefaultSize[type ?? "default"];
  return (
    <View style={[styles.container, style]}>
      <LottieView
        style={{ height: size, width: size }}
        source={(() => {
          switch (type) {
            case "success":
              return require("../assets/success.json");
            case "payment-success":
              return require("../assets/paymentSuccess.json");
            case "loader":
              return require("../assets/circle-loader.json");
            case "empty":
              return require("../assets/search-empty.json");
            default:
              return require("../assets/music.json");
          }
        })()}
        autoPlay
        loop
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

type LoaderType =
  | "success"
  | "payment-success"
  | "loader"
  | "empty"
  | "default";
const DefaultSize: Partial<Record<LoaderType, number>> = {
  default: 100,
};
export default Loader;
