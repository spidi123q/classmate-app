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
import useUser from "../../../login/hooks/useUser";
import { Image } from "react-native-elements";

export function HeaderMenu() {
  const navigation = useNavigation();
  const { classroom } = useUser();

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
      {classroom?.appLogoUrl ? (
        <Image
          style={{
            height: 30,
            width: 114,
          }}
          source={{
            uri: classroom?.appLogoUrl,
          }}
        />
      ) : (
        <LogoHorizontal />
      )}
      <NativeView>
        <NativeView type="ripple" onPress={openProfile}>
          <Profile />
        </NativeView>
      </NativeView>
    </NativeView>
  );
}
