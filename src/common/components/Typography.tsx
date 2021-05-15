import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import _ from "lodash";
import {
  AppFonts,
  DefaultFont,
  DefaultFontBold,
  DefaultFontColor,
  DefaultFontLight,
  FontFamily,
  FontSize,
  FontType,
} from "../config/themeConfig";

interface IProps extends TextProps, TextStyle {
  size?: number;
  color?: string;
  type?: FontType;
  family?: FontFamily;
}

const Typography: React.FunctionComponent<IProps> = (props) => {
  const {
    children,
    type,
    size,
    color,
    family,
    marginHorizontal,
    marginVertical,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    paddingVertical,
    opacity,
    textAlign,
    lineHeight,
    ...rest
  } = props;
  return (
    <Text
      style={{
        fontFamily: FontFamily[family ?? "regular"],
        fontSize: size ?? FontSize[type ?? "regular"],
        color: color ?? DefaultFontColor,
        marginHorizontal,
        marginVertical,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        paddingVertical,
        opacity,
        textAlign,
        lineHeight,
      }}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Typography;
