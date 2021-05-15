import React from "react";
import {
  ScrollView,
  View,
  ViewProps,
  ViewStyle,
  ScrollViewProps,
} from "react-native";
import LinearGradient, {
  LinearGradientProps,
} from "react-native-linear-gradient";
import Ripple, { RippleProps } from "react-native-material-ripple";
import * as Animatable from "react-native-animatable";

interface IProps extends ViewProps, ViewStyle, ScrollViewProps, RippleProps {
  children?: React.ReactNode;
  type?: ViewTypes;
  viewRef?: any;
}

const NativeView: React.FunctionComponent<
  IProps & Partial<LinearGradientProps>
> = (props) => {
  const {
    type,
    children,
    style,
    margin,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    flex,
    flexDirection,
    justifyContent,
    alignItems,
    borderBottomColor,
    borderBottomWidth,
    backgroundColor,
    keyboardShouldPersistTaps,
    viewRef,
    top,
    bottom,
    left,
    right,
    position,
    ...rest
  } = props;
  const SelectedView = viewMap[type ?? "default"];

  return (
    <SelectedView
      ref={(ref: any) => {
        if (viewRef) {
          viewRef.current = ref;
        }
      }}
      style={[
        {
          margin,
          marginBottom,
          marginTop,
          marginLeft,
          marginRight,
          marginHorizontal,
          marginVertical,
          flex,
          flexDirection,
          justifyContent,
          alignItems,
          borderBottomColor,
          borderBottomWidth,
          backgroundColor,
          top,
          bottom,
          left,
          right,
          position,
        },
        style,
      ]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps ?? "handled"}
      {...rest}
    >
      {children}
    </SelectedView>
  );
};

type ViewTypes = "scroll" | "ripple" | "default" | "gradient" | "animatable";

const viewMap: Record<ViewTypes, any> = {
  default: View,
  scroll: ScrollView,
  ripple: Ripple,
  gradient: LinearGradient,
  animatable: Animatable.View,
};

export default React.memo(NativeView);
