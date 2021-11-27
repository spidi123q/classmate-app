import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";
import NativeButton from "../../../../common/components/NativeButton";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import {
  DefaultMargin,
  DefaultSecondaryColor,
} from "../../../../common/config/themeConfig";
import { getJitsiUrl } from "../../../../common/helpers/misc";
import {
  IJitsiMeetUserInfo,
  RNJitsiMeet,
} from "../../../../common/native/jitsiMeet";
import { IUserStackNavigationProp } from "../../../../models/RoutePath";
import { buttonWidth } from "./OrganizationCard.style";

interface IProps {}

export default function Schedule(props: IProps) {
  const navigation = useNavigation<IUserStackNavigationProp>();

  const goLive = () => {
    const roomName = "werwerwerw";
    const url = getJitsiUrl(roomName);
    const userInfo: IJitsiMeetUserInfo = {
      displayName: "user 4",
    };

    if (Platform.OS === "ios" || Platform.OS === "web") {
      navigation.navigate("JitsiMeet", {
        url,
        userInfo,
        roomName,
      });
    } else if (Platform.OS === "android") {
      RNJitsiMeet.join(url, userInfo);
    }
  };

  return (
    <NativeView
      marginTop={DefaultMargin}
      flexDirection="row"
      justifyContent="space-between"
    >
      <NativeView>
        <Typography type="xs" color={AppTheme["color-dark"]}>
          Scheduled at
        </Typography>
        <Typography marginTop={DefaultMargin / 4} type="xsx">
          {new Date().toLocaleString()}
        </Typography>
      </NativeView>
      <NativeView justifyContent="flex-end">
        <NativeButton
          title="Go Live"
          size="xs"
          buttonBackgroundColor={AppTheme["color-danger-500"]}
          buttonTextColor={DefaultSecondaryColor}
          buttonFontFamily="regular"
          iconName="videocam"
          width={buttonWidth}
          onPress={goLive}
        />
      </NativeView>
    </NativeView>
  );
}
