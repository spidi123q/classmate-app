import React from "react";
import NativeView from "../../../../common/components/NativeView";
import {
  DoubleMargin,
  DefaultMargin,
} from "../../../../common/config/themeConfig";
import LogoHorizontal from "../../../../common/assets/LogoHorizontal.svg";
import Profile from "../../../../common/assets/Profile.svg";

export function HeaderMenu() {
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
        <NativeView type="ripple">
          <Profile />
        </NativeView>
      </NativeView>
    </NativeView>
  );
}
