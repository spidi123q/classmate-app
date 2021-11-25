import React, { useRef } from "react";
import {
  BottomTabBarProps,
  BottomTabBarOptions,
} from "@react-navigation/bottom-tabs";
import { Animated, SafeAreaView, View } from "react-native";
import styles from "./HeaderNavigation.style";
import NavigationFooter from "./navigationFooter/NavigationFooter";
import { useNavigation } from "@react-navigation/native";

export default function HeaderNavigation(
  props: BottomTabBarProps<BottomTabBarOptions>
) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationFooter {...props} />
    </SafeAreaView>
  );
}
