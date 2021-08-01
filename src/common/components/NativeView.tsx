import React from "react";
import {
  ScrollView,
  View,
  ViewProps,
  ViewStyle,
  ScrollViewProps,
  ImageBackground,
  ImageBackgroundProps,
} from "react-native";
import Ripple, { RippleProps } from "react-native-material-ripple";
import * as Animatable from "react-native-animatable";
import LinearGradient, {
  LinearGradientProps,
} from "react-native-linear-gradient";

type IProps =
  | IGradientProps
  | IViewProps
  | IScrollViewProps
  | IRippleProps
  | IImageProps
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
  | "image";

const viewMap: Record<ViewTypes, any> = {
  default: View,
  scroll: ScrollView,
  ripple: Ripple,
  gradient: LinearGradient,
  animatable: Animatable.View,
  image: ImageBackground,
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

interface IRippleProps extends RippleProps, IBaseProps {
  type: "ripple";
}

interface IAnimatableProps extends ViewProps, IBaseProps {
  type: "animatable";
}

interface IImageProps
  extends ImageBackgroundProps,
    Omit<IBaseProps, "height" | "width"> {
  type: "image";
  children?: React.ReactNode;
}

export default React.memo(NativeView);
