import { isEqual } from "lodash";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import {
  DefaultBorderRadius,
  DefaultFontColor,
  DefaultIconFamily,
  DefaultMargin,
  DoubleMargin,
  FontSize,
  IconFamily,
} from "../config/themeConfig";
import Typography from "./Typography";

interface IProps<T> {
  options: IAvatarListItem<T>[];
  selectedValue?: T;
  onPress?: (value: T) => any;
}

export default function NativeList<T>(props: IProps<T>) {
  const { options, onPress, selectedValue } = props;

  return (
    <FlatList
      data={options}
      keyExtractor={(item, index) => `item - ${index}`}
      renderItem={({ item }) => (
        <Ripple
          style={styles.container}
          onPress={() => onPress && onPress(item.option)}
          rippleContainerBorderRadius={DefaultBorderRadius}
        >
          <Typography
            marginHorizontal={DefaultMargin}
            marginVertical={DefaultMargin}
          >
            {item.title}
          </Typography>
          {isEqual(selectedValue, item.option) && (
            <Icon
              size={FontSize.h3}
              type={item.iconFamily ?? DefaultIconFamily}
              name={"checkmark-outline"}
              color={DefaultFontColor}
            />
          )}
        </Ripple>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: DefaultMargin,
  },
});

export interface IAvatarListItem<T = any> {
  icon?: string;
  iconColor?: string;
  iconFamily?: IconFamily;
  title: string;
  description?: string;
  option: T;
  actions?: {
    icon: string;
    disabled?: boolean;
    iconColor?: "inherit" | "default" | "primary" | "secondary";
    onPress?: () => any;
  }[];
  onPress?: (value: T) => any;
}

export const ItemHeight = DoubleMargin + 20;
