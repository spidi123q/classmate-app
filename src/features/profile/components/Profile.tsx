import React from "react";
import { Text } from "react-native";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import {
  DefaultMargin,
  DoubleMargin,
  FontSize,
} from "../../../common/config/themeConfig";
import useUser from "../../login/hooks/useUser";
import { formatPhoneNumber } from "../../../common/helpers/format";
import { AppTheme } from "../../../common/config/custom-theme";
import ProfileMenu from "./ProfileMenu";

export default function Profile() {
  const { name, phone } = useUser();
  return (
    <NativeLayout>
      <NativeHeader title="Edit Profile" />
      <NativeView marginHorizontal={DefaultMargin}></NativeView>
    </NativeLayout>
  );
}

const profilePicSize = 100;
