import React from "react";
import NativeView from "../../common/components/NativeView";
import { DoubleMargin, DefaultMargin } from "../../common/config/themeConfig";
import LogoHorizontal from "../../common/assets/LogoHorizontal.svg";
import Profile from "../../common/assets/BlankUser.svg";
import { useNavigation } from "@react-navigation/native";
import { IUserStackNavigationProp } from "../../models/RoutePath";
import { IconLabel } from "../../common/components/IconLabel";

export function HeaderMenu() {
  const navigation = useNavigation<IUserStackNavigationProp>();

  const openProfile = () => {
    navigation.navigate("Profile");
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
        <IconLabel
          Icon={Profile}
          height={34}
          width={34}
          onPress={openProfile}
        />
      </NativeView>
    </NativeView>
  );
}
