import React from "react";
import NativeView from "../../../../common/components/NativeView";
import {
  DoubleMargin,
  DefaultMargin,
} from "../../../../common/config/themeConfig";
import LogoHorizontal from "../../../../common/assets/LogoHorizontal.svg";
import BlankUser from "../../../../common/assets/BlankUser.svg";
import { useNavigation } from "@react-navigation/native";
import { HomePages, IRootStackParamList } from "../../../../models/RoutePath";
import useUser from "../../../login/hooks/useUser";
import { Image } from "react-native-elements";

export function HeaderMenu() {
  const navigation = useNavigation();
  const { organization } = useUser();

  return (
    <NativeView
      marginVertical={DefaultMargin}
      marginHorizontal={DefaultMargin}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {organization?.appLogoUrl ? (
        <Image
          style={{
            height: 30,
            width: 114,
          }}
          source={{
            uri: organization?.appLogoUrl,
          }}
        />
      ) : (
        <LogoHorizontal />
      )}
    </NativeView>
  );
}
