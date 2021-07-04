import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import {
  DefaultBorderRadius,
  DefaultFontColor,
  DefaultIconFamily,
  DefaultMargin,
  FontSize,
  IconFamily,
} from "../config/themeConfig";
import Typography from "./Typography";

interface IProps<T> {
  options: T[];
  stringKey: keyof T;
  iconNames?: string[];
  iconFamily?: IconFamily;
  selectedValue?: T;
  onPress?: (value: T) => any;
}

export default function NativeList<T>(props: IProps<T>) {
  const { options, stringKey, onPress, iconNames, iconFamily, selectedValue } =
    props;

  return (
    <FlatList
      data={options}
      keyExtractor={(item) => item[stringKey] as any}
      renderItem={({ item }) => (
        <Ripple
          style={styles.container}
          onPress={() => onPress && onPress(item)}
          rippleContainerBorderRadius={DefaultBorderRadius}
        >
          {iconNames && (
            <Icon
              size={FontSize.h3}
              type={iconFamily ?? DefaultIconFamily}
              name={iconNames[options.indexOf(item)]}
            />
          )}
          <Typography
            marginHorizontal={DefaultMargin}
            marginVertical={DefaultMargin}
          >
            {item[stringKey]}
          </Typography>
          {selectedValue && selectedValue[stringKey] === item[stringKey] && (
            <Icon
              size={FontSize.h3}
              type={iconFamily ?? DefaultIconFamily}
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
