import React, {
  forwardRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import { bounceInProps, fadeIn, slideUpProps } from "../helpers/animation";
import { AppTheme } from "../config/custom-theme";
import Typography from "./Typography";
import { Button, Icon } from "react-native-elements";
import {
  DefaultFontColor,
  DefaultIconFamily,
  DefaultMargin,
  DoubleMargin,
  FontSize,
  ICON_SIZE,
} from "../config/themeConfig";
import { useNavigation } from "@react-navigation/native";
import Ripple from "react-native-material-ripple";
import NativeView from "./NativeView";

interface IProps {
  title?: string;
  component?: JSX.Element;
  onBack?: () => any;
  style?: any;
}

export interface IHeader {
  toggle: () => void;
  setActions: (actions: IActions[]) => void;
}

const NativeHeader = forwardRef((props: IProps, ref: any) => {
  const navigation = useNavigation();
  const { title, component, onBack, style } = props;

  return (
    <View style={style}>
      <Typography type="h2">{title}</Typography>
    </View>
  );
});

export interface IActions {
  icon: string;
  onPress: () => any;
}

export default NativeHeader;
