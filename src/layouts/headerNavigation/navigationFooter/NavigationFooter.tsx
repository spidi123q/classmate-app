import React, { useState } from "react";
import {
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { RoutePath, TabPages } from "../../../models/RoutePath";
import { Icon } from "react-native-elements";
import { AppTheme } from "../../../common/config/custom-theme";
import styles, {
  borderHighLight,
  iconHighLight,
  textHighLight,
} from "./NavigationFooter.style";
import _ from "lodash";
import {
  DefaultBorderRadius,
  DefaultIconFamily,
  DoubleMargin,
  FontSize,
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
      <NativeView flexDirection="row" marginHorizontal={DoubleMargin}>
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
  switch (path) {
    case TabPages.WalletPage: {
      return (
        <Ripple
          onPress={onPress}
          style={borderHighLight(isMatch)}
          rippleContainerBorderRadius={DefaultBorderRadius}
        >
          <Typography style={textHighLight(isMatch)}>Wallet</Typography>
        </Ripple>
      );
    }
    case TabPages.SellerPage:
      return (
        <Ripple
          onPress={onPress}
          style={borderHighLight(isMatch)}
          rippleContainerBorderRadius={DefaultBorderRadius}
        >
          <Typography style={textHighLight(isMatch)}>Seller</Typography>
        </Ripple>
      );
    case TabPages.ServicesPage: {
      return (
        <Ripple
          onPress={onPress}
          style={borderHighLight(isMatch)}
          rippleContainerBorderRadius={DefaultBorderRadius}
        >
          <Typography style={textHighLight(isMatch)}>Services</Typography>
        </Ripple>
      );
    }
    default:
      return null;
  }
};

export default NavigationFooter;
