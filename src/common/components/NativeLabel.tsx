import React from "react";
import { View } from "react-native";
import { AppTheme } from "../config/custom-theme";
import { DefaultMargin } from "../config/themeConfig";
import Typography from "./Typography";

interface IProps {
  label?: string;
}

const NativeLabel: React.FunctionComponent<IProps> = function (props) {
  const { label, children } = props;
  return (
    <View>
      {label && (
        <Typography
          type="xsx"
          marginVertical={5}
          color={AppTheme["color-grey2"]}
        >
          {label}
        </Typography>
      )}
      {children}
    </View>
  );
};

export default NativeLabel;
