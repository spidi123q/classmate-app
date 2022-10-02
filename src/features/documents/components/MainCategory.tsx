import React from "react";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { AppTheme } from "../../../common/config/custom-theme";
import {
  DeafultBorderColor,
  DefaultBorderRadius,
  DefaultFontColor,
  DefaultHintFontColor,
  DefaultMargin,
} from "../../../common/config/themeConfig";
import Icon from "react-native-remix-icon";
import { useNavigation } from "@react-navigation/native";
import {
  HomePages,
  IRootStackNavigationProps,
} from "../../../models/RoutePath";

export function MainCategory() {
  const navigation = useNavigation<IRootStackNavigationProps>();
  return (
    <NativeView
      type="ripple"
      borderWidth={1}
      borderColor={DeafultBorderColor}
      height={ItemDimension}
      borderRadius={DefaultBorderRadius}
      justifyContent="center"
      alignItems="center"
      onPress={() => navigation.navigate("View Documents")}
    >
      <NativeView justifyContent="center" alignItems="center">
        <NativeView
          borderWidth={2}
          height={46}
          width={46}
          borderRadius={DefaultBorderRadius}
          borderColor={DeafultBorderColor}
          justifyContent="center"
          alignItems="center"
        >
          <Icon name="ri-bill-line" color={DefaultFontColor} size={24} />
        </NativeView>
        <Typography
          type="h3"
          marginTop={DefaultMargin / 2}
          marginBottom={DefaultMargin / 4}
        >
          Writing
        </Typography>
        <Typography color={DefaultHintFontColor} type="xsx">
          3 chapters
        </Typography>
      </NativeView>
    </NativeView>
  );
}

export const ItemDimension = 150;
