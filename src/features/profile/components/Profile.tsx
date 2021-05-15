import React from "react";
import { Text } from "react-native";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import TransitionLayout from "../../../common/components/TransitionLayout";
import Typography from "../../../common/components/Typography";
import {
  DefaultMargin,
  DoubleMargin,
  FontSize,
} from "../../../common/config/themeConfig";
import useUser from "../../login/hooks/useUser";
import BlankUser from "../../../common/assets/BlankUser.svg";
import { formatPhoneNumber } from "../../../common/helpers/format";
import { AppTheme } from "../../../common/config/custom-theme";
import ProfileMenu from "./ProfileMenu";

export default function Profile() {
  const { name, phone } = useUser();
  return (
    <NativeLayout>
      <NativeHeader noBorder />
      <NativeView marginHorizontal={DefaultMargin * 3}>
        <NativeView
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingBottom={DoubleMargin}
          borderBottomColor={AppTheme["color-grey"]}
          borderBottomWidth={1}
        >
          <NativeView>
            <Typography family="semiBold" size={FontSize.h1}>
              {name}
            </Typography>
            <Typography size={FontSize.regular} marginTop={DefaultMargin}>
              {formatPhoneNumber(phone)}
            </Typography>
          </NativeView>
          <NativeView marginTop={-DefaultMargin * 3}>
            <BlankUser height={profilePicSize} width={profilePicSize} />
          </NativeView>
        </NativeView>
        <NativeView marginTop={DoubleMargin}>
          <ProfileMenu />
        </NativeView>
      </NativeView>
    </NativeLayout>
  );
}

const profilePicSize = 100;
