import React from "react";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import { DefaultMargin } from "../../../common/config/themeConfig";
import useUser from "../../login/hooks/useUser";
import { formatPhoneNumber } from "../../../common/helpers/format";
import NativeTextInput from "../../../common/components/NativeTextInput";
import BlankUser from "../../../common/assets/BlankUser.svg";
import NativeButton from "../../../common/components/NativeButton";
import { AppTheme } from "../../../common/config/custom-theme";
import { Button } from "react-native-elements";
import useLoginActions from "../../login/hooks/useLoginActions";

export default function Profile() {
  const { name, phone, email, organization, classroom } = useUser();
  const { logout } = useLoginActions();

  return (
    <NativeLayout scroll lockToPortrait horizontalMargin>
      <NativeView>
        <NativeView
          justifyContent="center"
          alignItems="center"
          marginVertical={DefaultMargin}
        >
          <BlankUser height={87} width={87} />
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
        <NativeView marginBottom={DefaultMargin}>
          <Button
            title="Logout"
            type="clear"
            titleStyle={{
              color: AppTheme["color-danger"],
            }}
            onPress={logout}
          />
        </NativeView>
      </NativeView>
    </NativeLayout>
  );
}

const profilePicSize = 100;
