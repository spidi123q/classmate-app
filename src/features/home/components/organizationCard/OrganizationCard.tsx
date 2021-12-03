import React from "react";
import NativeView, {
  INativeViewProps,
  IViewProps,
} from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { Image } from "react-native-elements";
import { buttonHeight, buttonWidth, styles } from "./OrganizationCard.style";
import { NativeSkeletonPlaceholder } from "../../../../common/components/nativeSkeleton";
import {
  DefaultHintFontColor,
  DefaultMargin,
  DefaultSecondaryColor,
  FontSize,
  SecondaryBackgroundColor,
} from "../../../../common/config/themeConfig";
import { AppTheme } from "../../../../common/config/custom-theme";
import NativeButton from "../../../../common/components/NativeButton";
import Instagram from "../../../../common/assets/Instagram.svg";
import Youtube from "../../../../common/assets/Youtube.svg";
import { SvgProps } from "react-native-svg";
import { IconLabel } from "../../../../common/components/IconLabel";
import { getJitsiUrl } from "../../../../common/helpers/misc";
import {
  IJitsiMeetUserInfo,
  RNJitsiMeet,
} from "../../../../common/native/jitsiMeet";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IDashboardUserNavigationProp } from "../../../../models/RoutePath";
import Schedule from "./Schedule";
import useLoginActions from "../../../login/hooks/useLoginActions";
import IOrganization from "../../../../models/Organization";
import { openURL } from "../../../../common/helpers/platform";

interface IProps {
  organization: IOrganization;
  showSchedule?: boolean;
  showBooking?: boolean;
}

export default function OrganizationCard(props: IProps) {
  const { organization, showSchedule, showBooking, ...rest } = props;
  const { authorizedOnly } = useLoginActions();
  const navigation = useNavigation<IDashboardUserNavigationProp>();

  const bookSlot = () =>
    authorizedOnly(() =>
      navigation.navigate("Dashboard", {
        screen: "Booking",
        params: { organization },
      })
    );

  const dummyButton = (
    <NativeView
      width={buttonWidth}
      height={buttonHeight}
      backgroundColor={SecondaryBackgroundColor}
      {...rest}
    />
  );

  return (
    <NativeView
      backgroundColor={SecondaryBackgroundColor}
      padding={DefaultMargin / 2}
      borderRadius={10}
    >
      <NativeView flexDirection="row">
        <Image
          style={styles.profilePicture}
          source={{
            uri: organization.profileThumbUrl,
          }}
          PlaceholderContent={
            <NativeSkeletonPlaceholder
              items={[
                {
                  width: styles.profilePicture.width,
                  height: styles.profilePicture.height,
                  borderRadius: styles.profilePicture.borderRadius,
                },
              ]}
            ></NativeSkeletonPlaceholder>
          }
        />
        <NativeView marginLeft={DefaultMargin / 2} flex={1}>
          <Typography type="h3">{organization.name}</Typography>
          <Typography
            type="xsx"
            marginTop={DefaultMargin / 4}
            marginBottom={DefaultMargin / 2}
            color={DefaultHintFontColor}
            numberOfLines={1}
          >
            {organization.caption}
          </Typography>
          <NativeView
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {organization.youtubeCountFormated && (
              <IconLabel
                Icon={Youtube}
                label={organization.youtubeCountFormated}
                onPress={() => openURL(organization.youtube)}
              />
            )}
            {organization.instagramCountFormated && (
              <IconLabel
                Icon={Instagram}
                label={organization.instagramCountFormated}
                onPress={() => openURL(organization.instagram)}
              />
            )}
            {showBooking ? (
              <NativeButton
                title="Book slot"
                size="xs"
                backgroundColor="color-accent1"
                buttonFontFamily="regular"
                width={buttonWidth}
                onPress={bookSlot}
              />
            ) : (
              dummyButton
            )}
          </NativeView>
        </NativeView>
      </NativeView>
      {showSchedule && <Schedule />}
    </NativeView>
  );
}
