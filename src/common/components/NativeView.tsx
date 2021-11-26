import React from "react";
import {
  ScrollView,
  View,
  ViewProps,
  ViewStyle,
  ScrollViewProps,
  ImageBackground,
  ImageBackgroundProps,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient, {
  LinearGradientProps,
} from "react-native-linear-gradient";
import NativeRipple, { INativeRippleProps } from "./nativeRipple";

type IProps =
  | IGradientProps
  | IViewProps
  | IScrollViewProps
  | IRippleProps
  | IImageProps
  | ISafeAreaProps
  | IAnimatableProps;

const NativeView: React.FunctionComponent<IProps> = (props) => {
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
    padding,
    paddingTop,
    paddingBottom,
    paddingHorizontal,
    paddingVertical,
    flex,
    flexDirection,
    justifyContent,
    alignItems,
    borderBottomColor,
    borderBottomWidth,
    backgroundColor,
    minHeight,
    viewRef,
    top,
    bottom,
    left,
    right,
    position,
    height,
    maxWidth,
    maxHeight,
    width,
    ...rest
  } = props;
  const SelectedView = viewMap[(type as ViewTypes) ?? "default"];

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
          padding,
          paddingTop,
          paddingBottom,
          paddingHorizontal,
          paddingVertical,
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
          height,
          width,
          maxWidth,
          maxHeight,
          minHeight,
          resizeMethod: props.type === "image" ? props.resizeMethod : undefined,
          resizeMode: props.type === "image" ? props.resizeMode : undefined,
        },
        style,
      ]}
      keyboardShouldPersistTaps={
        props.type === "scroll"
          ? props.keyboardShouldPersistTaps ?? "handled"
          : undefined
      }
      {...rest}
    >
      {children}
    </SelectedView>
  );
};

type ViewTypes =
  | "scroll"
  | "ripple"
  | "default"
  | "animatable"
  | "gradient"
  | "safeArea"
  | "image";

const viewMap: Record<ViewTypes, any> = {
  default: View,
  scroll: ScrollView,
  ripple: NativeRipple,
  gradient: LinearGradient,
  animatable: Animatable.View,
  image: ImageBackground,
  safeArea: SafeAreaView,
};

interface IBaseProps extends ViewStyle {
  children?: React.ReactNode;
  viewRef?: any;
}
interface IGradientProps
  extends LinearGradientProps,
    Omit<IBaseProps, "start" | "end"> {
  type: "gradient";
}

interface IViewProps extends ViewProps, IBaseProps {
  type?: "default" | undefined;
}

interface IScrollViewProps extends ScrollViewProps, IBaseProps {
  type: "scroll";
}

interface IRippleProps extends INativeRippleProps, IBaseProps {
  type: "ripple";
}

interface IAnimatableProps extends ViewProps, IBaseProps {
  type: "animatable";
}

interface ISafeAreaProps extends ViewProps, IBaseProps {
  type: "safeArea";
}

interface IImageProps
  extends ImageBackgroundProps,
    Omit<IBaseProps, "height" | "width"> {
  type: "image";
  children?: React.ReactNode;
}

export default React.memo(NativeView);
