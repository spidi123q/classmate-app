import React from "react";
import { View } from "react-native";
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
        <Typography type="xs" marginVertical={DefaultMargin / 2}>
          {label}
        </Typography>
      )}
      {children}
    </View>
  );
};

export default NativeLabel;
