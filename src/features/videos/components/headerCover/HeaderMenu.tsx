import React from "react";
import NativeView from "../../../../common/components/NativeView";
import {
  DoubleMargin,
  DefaultMargin,
} from "../../../../common/config/themeConfig";
import LogoHorizontal from "../../../../common/assets/LogoHorizontal.svg";
import Profile from "../../assets/Profile.svg";
import { useNavigation } from "@react-navigation/native";
import { HomePages } from "../../../../models/RoutePath";

export function HeaderMenu() {
  const navigation = useNavigation();

  const openProfile = () => {
    navigation.navigate(HomePages.Profile);
  };

  return (
    <NativeView
      marginTop={DoubleMargin}
      marginHorizontal={DefaultMargin}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <LogoHorizontal />
      <NativeView>
        <NativeView type="ripple" onPress={openProfile}>
          <Profile />
        </NativeView>
      </NativeView>
    </NativeView>
  );
}
