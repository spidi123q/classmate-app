import React from "react";
import NativeView from "../../common/components/NativeView";
import { DoubleMargin, DefaultMargin } from "../../common/config/themeConfig";
import LogoHorizontal from "../../common/assets/LogoHorizontal.svg";
import Profile from "../../common/assets/BlankUser.svg";
import { useNavigation } from "@react-navigation/native";
import { HomePages } from "../../models/RoutePath";

export function HeaderMenu() {
  const navigation = useNavigation();

  const openProfile = () => {
    //  navigation.navigate(HomePages.Profile);
  };

  return (
    <NativeView
      margin={DefaultMargin}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <LogoHorizontal />
      <NativeView>
        <NativeView type="ripple" onPress={openProfile} height={34} width={34}>
          <Profile height={34} width={34} />
        </NativeView>
      </NativeView>
    </NativeView>
  );
}
