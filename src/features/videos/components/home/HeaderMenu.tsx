import React from "react";
import NativeView from "../../../../common/components/NativeView";
import {
  DoubleMargin,
  DefaultMargin,
  DefaultFontColor,
} from "../../../../common/config/themeConfig";
import LogoHorizontal from "../../../../common/assets/LogoHorizontal.svg";
import { useNavigation } from "@react-navigation/native";
import useUser from "../../../login/hooks/useUser";
import { Button, Image } from "react-native-elements";
import Icon from "react-native-remix-icon";
import useUserAPI from "../../../login/hooks/useUserAPI";

export function HeaderMenu() {
  const navigation = useNavigation();
  const { organization } = useUser();
  const { getUser } = useUserAPI();

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
      <Button
        type="clear"
        icon={
          <Icon name="ri-refresh-line" size={20} color={DefaultFontColor} />
        }
        onPress={() => getUser()}
      />
    </NativeView>
  );
}
