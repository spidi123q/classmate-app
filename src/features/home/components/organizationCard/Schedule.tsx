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
import { formatWithTime } from "../../../../common/helpers/formatDate";
import { getJitsiUrl } from "../../../../common/helpers/misc";
import {
  IJitsiMeetUserInfo,
  RNJitsiMeet,
} from "../../../../common/native/jitsiMeet";
import IBooking from "../../../../models/Booking";
import { BookingStatus } from "../../../../models/enum";
import {
  IDashboardUserNavigationProp,
  IUserStackNavigationProp,
} from "../../../../models/RoutePath";
import useUser from "../../../login/hooks/useUser";
import { buttonWidth } from "./OrganizationCard.style";

interface IProps {
  booking: IBooking;
}

export default function Schedule(props: IProps) {
  const { booking } = props;
  const navigation = useNavigation<IDashboardUserNavigationProp>();
  const { name, phone } = useUser();

  const goLive = () => {
    const roomName = booking.liveDetails.roomName;
    const url = getJitsiUrl(roomName);
    const userInfo: IJitsiMeetUserInfo = {
      displayName: "user 4",
    };

    if (Platform.OS === "ios" || Platform.OS === "web") {
      navigation.navigate("Dashboard", {
        screen: "JitsiMeet",
        params: {
          url,
          userInfo,
          roomName,
        },
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
          {getSheduleTitle(booking)}
        </Typography>
        <Typography marginTop={DefaultMargin / 4} type="xsx">
          {getScheduleDetails(booking)}
        </Typography>
      </NativeView>
      <NativeView justifyContent="flex-end">
        {booking.status == BookingStatus.Accepted && booking.paymentDetails && (
          <NativeButton
            title="Go Live"
            size="xs"
            backgroundColor="color-danger-500"
            buttonFontFamily="regular"
            iconName="videocam"
            width={buttonWidth}
            onPress={goLive}
          />
        )}
      </NativeView>
    </NativeView>
  );
}

const getSheduleTitle = (booking: IBooking): string => {
  switch (booking.status) {
    case BookingStatus.Accepted:
    case BookingStatus.AwaitingConfirmation:
      return "Scheduled at";
    default:
      return booking.status;
  }
};

const getScheduleDetails = (booking: IBooking): string => {
  switch (booking.status) {
    case BookingStatus.Accepted:
    case BookingStatus.Completed:
      return formatWithTime(booking.scheduledAt);
    case BookingStatus.Rejected:
      return "Refund will be completed in 5-7 working days";
    case BookingStatus.AwaitingConfirmation:
      return BookingStatus.AwaitingConfirmation;
    default:
      return "";
  }
};
