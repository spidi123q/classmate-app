import React, { useState } from "react";
import { View } from "react-native";
import { RoutePath, TabPages } from "../../../models/RoutePath";
import styles, {
  borderHighLight,
  iconHighLight,
  textHighLight,
} from "./NavigationFooter.style";
import _ from "lodash";
import {
  DefaultBorderRadius,
  DefaultIconFamily,
  DefaultMargin,
  DoubleMargin,
  FontSize,
  SecondaryFontColor,
} from "../../../common/config/themeConfig";
import Ripple from "react-native-material-ripple";
import {
  BottomTabBarProps,
  BottomTabBarOptions,
} from "@react-navigation/bottom-tabs";
import Typography from "../../../common/components/Typography";
import NativeView from "../../../common/components/NativeView";

const NavigationFooter = (props: BottomTabBarProps<BottomTabBarOptions>) => {
  const { state, descriptors, navigation } = props;
  const activeTabIndex = state.index;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      <NativeView flexDirection="row" marginHorizontal={5}>
        {state.routes.map((route, index) => (
          <Tab
            key={route.key}
            path={route.name}
            isMatch={index === activeTabIndex}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              const isFocused = state.index === index;
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
          />
        ))}
      </NativeView>
    </View>
  );
};

interface ITabProps {
  path: string;
  onPress: () => any;
  isMatch: boolean;
}
const Tab = (props: ITabProps) => {
  const { path, onPress, isMatch } = props;
  const fontColor = isMatch ? SecondaryFontColor : undefined;
  switch (path) {
    case TabPages.Explore: {
      return (
        <Ripple
          onPress={onPress}
          style={borderHighLight(isMatch)}
          rippleContainerBorderRadius={DefaultBorderRadius}
        >
          <Typography family="regular" color={fontColor} textAlign="center">
            Explore
          </Typography>
        </Ripple>
      );
    }
    case TabPages.MyBookings:
      return (
        <Ripple
          onPress={onPress}
          style={borderHighLight(isMatch)}
          rippleContainerBorderRadius={DefaultBorderRadius}
        >
          <Typography family="regular" color={fontColor} textAlign="center">
            My Bookings
          </Typography>
        </Ripple>
      );
    default:
      return null;
  }
};

export default NavigationFooter;
