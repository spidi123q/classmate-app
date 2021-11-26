import React from "react";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import { DefaultMargin } from "../../../common/config/themeConfig";
import useUser from "../../login/hooks/useUser";
import { formatPhoneNumber } from "../../../common/helpers/format";
import NativeTextInput from "../../../common/components/NativeTextInput";
import BlankUser from "../../../common/assets/BlankUser.svg";
import ProfileMenu from "./ProfileMenu";

export default function Profile() {
  const { name, phone, email, organization, classroom } = useUser();
  return (
    <NativeLayout lockToPortrait flex={1}>
      <NativeHeader title="Edit Profile" />
      <NativeView
        type="scroll"
        marginTop={DefaultMargin}
        marginHorizontal={DefaultMargin}
      >
        <NativeView
          justifyContent="center"
          alignItems="center"
          marginVertical={DefaultMargin}
        >
          <BlankUser height={profilePicSize} width={profilePicSize} />
        </NativeView>
        <NativeView marginBottom={DefaultMargin}>
          <NativeTextInput
            label="Phone Number"
            value={formatPhoneNumber(phone)}
            editable={false}
          />
        </NativeView>
        <NativeView>
          <ProfileMenu />
        </NativeView>
      </NativeView>
    </NativeLayout>
  );
}

const profilePicSize = 87;
