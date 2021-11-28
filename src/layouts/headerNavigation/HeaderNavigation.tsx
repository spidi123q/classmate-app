import React, { useRef } from "react";
import {
  BottomTabBarProps,
  BottomTabBarOptions,
} from "@react-navigation/bottom-tabs";
import NavigationFooter from "./navigationFooter/NavigationFooter";
import { useNavigation } from "@react-navigation/native";
import NativeLayout from "../../common/components/NativeLayout";
import { HeaderMenu } from "./HeaderMenu";
import NativeView from "../../common/components/NativeView";
import { DefaultBackgroundColor } from "../../common/config/themeConfig";

export default function HeaderNavigation(
  props: BottomTabBarProps<BottomTabBarOptions>
) {
  return (
    <NativeLayout unsetFlex>
      <HeaderMenu />
      <NavigationFooter {...props} />
    </NativeLayout>
  );
}
