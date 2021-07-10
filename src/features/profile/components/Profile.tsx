import React from "react";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import { DefaultMargin } from "../../../common/config/themeConfig";
import useUser from "../../login/hooks/useUser";
import { formatPhoneNumber } from "../../../common/helpers/format";
import NativeTextInput from "../../../common/components/NativeTextInput";
import BlankUser from "../assets/BlankUser.svg";

export default function Profile() {
  const { name, phone, email, organization, classroom } = useUser();
  return (
    <NativeLayout scroll>
      <NativeHeader title="Edit Profile" />
      <NativeView marginTop={DefaultMargin} marginHorizontal={DefaultMargin}>
        <NativeView
          justifyContent="center"
          alignItems="center"
          marginVertical={DefaultMargin}
        >
          <BlankUser />
        </NativeView>
        <NativeView marginBottom={DefaultMargin}>
          <NativeTextInput label="Name" value={name} editable={false} />
        </NativeView>
        <NativeView marginBottom={DefaultMargin}>
          <NativeTextInput
            label="Phone Number"
            value={formatPhoneNumber(phone)}
            editable={false}
          />
        </NativeView>
        <NativeView marginBottom={DefaultMargin}>
          <NativeTextInput label="Email" value={email} editable={false} />
        </NativeView>
        <NativeView marginBottom={DefaultMargin}>
          <NativeTextInput
            label="Organization"
            value={organization?.name}
            editable={false}
          />
        </NativeView>
        <NativeView marginBottom={DefaultMargin}>
          <NativeTextInput
            label="Classroom"
            value={classroom?.name}
            editable={false}
          />
        </NativeView>
      </NativeView>
    </NativeLayout>
  );
}

const profilePicSize = 100;
