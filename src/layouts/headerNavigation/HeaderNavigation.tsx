import React, { useRef } from "react";
import {
  BottomTabBarProps,
  BottomTabBarOptions,
} from "@react-navigation/bottom-tabs";
import { Animated, SafeAreaView, View } from "react-native";
import styles from "./HeaderNavigation.style";
import NavigationFooter from "./navigationFooter/NavigationFooter";
import { Text } from "react-native";
import useAppInfo from "../../common/hooks/useAppInfo";
import * as Animatable from "react-native-animatable";
import {
  animate,
  bounceInProps,
  slideDownProps,
} from "../../common/helpers/animation";
import useUser from "../../features/login/hooks/useUser";
import { capitalize } from "lodash";
import Typography from "../../common/components/Typography";
import {
  DefaultIconFamily,
  DefaultMargin,
  DoubleMargin,
  FontSize,
} from "../../common/config/themeConfig";
import { AppTheme } from "../../common/config/custom-theme";
import NativeView from "../../common/components/NativeView";
import { Icon } from "react-native-elements";
import BlankUser from "../../common/assets/BlankUser.svg";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import { ProductPages } from "../../models/RoutePath";
import { withBadge, BadgeProps } from "react-native-elements";
import BadgedIcon from "../../common/components/BadgedIcon";

export default function HeaderNavigation(
  props: BottomTabBarProps<BottomTabBarOptions>
) {
  const { name } = useUser();
  const navigation = useNavigation();
  const { notifications } = useAppInfo();

  const openSearch = () => navigation.navigate(ProductPages.ProductSearch);

  const openProfile = () => navigation.navigate(ProductPages.Profile);

  const openNotification = () =>
    navigation.navigate(ProductPages.Notifications);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View {...bounceInProps}>
        <NativeView
          margin={DoubleMargin}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Typography
            size={FontSize.h1}
            color={AppTheme["color-black"]}
            family="semiBold"
          >
            Hi {capitalize(name)}
          </Typography>
          <NativeView flexDirection="row">
            <BadgedIcon
              count={notifications.totalDocs}
              color={AppTheme["color-black"]}
              type={DefaultIconFamily}
              name="notifications-outline"
              size={FontSize.h1}
              onPress={openNotification}
              marginRight={DefaultMargin}
            />
            <BadgedIcon
              color={AppTheme["color-black"]}
              type={DefaultIconFamily}
              name="search-outline"
              size={FontSize.h1}
              onPress={openSearch}
            />
            <NativeView
              type="ripple"
              height={blankUserSize}
              width={blankUserSize}
              rippleContainerBorderRadius={blankUserSize}
              onPress={openProfile}
              padding={0.2 * blankUserSize}
              marginHorizontal={DefaultMargin}
            >
              {/* <BlankUser height={blankUserSize} width={blankUserSize} /> */}
            </NativeView>
          </NativeView>
        </NativeView>
      </Animatable.View>
      <NavigationFooter {...props} />
    </SafeAreaView>
  );
}

const blankUserSize = FontSize.h1 + 2;
