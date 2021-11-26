import React from "react";
import { SvgProps } from "react-native-svg";
import { FontSize, DefaultMargin } from "../config/themeConfig";
import NativeView, { INativeViewProps } from "./NativeView";
import Typography from "./Typography";

interface IIconLabelProps {
  Icon: React.FC<SvgProps>;
  label: string;
}

export const IconLabel = ({
  Icon,
  label,
  ...rest
}: IIconLabelProps & INativeViewProps) => (
  <NativeView
    type="ripple"
    flexDirection="row"
    height={FontSize.h3}
    alignItems="center"
    justifyContent="center"
    {...rest}
  >
    <Icon height={FontSize.regular} />
    <Typography marginLeft={DefaultMargin / 5} type="xsx">
      {label}
    </Typography>
  </NativeView>
);
