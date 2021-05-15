import React from "react";
import { Icon } from "react-native-elements";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import {
  DefaultIconFamily,
  DefaultMargin,
  DoubleMargin,
  FontSize,
} from "../../../../common/config/themeConfig";
import { ClaimStatus } from "../../../../models/enum";

interface IProps {
  status: ClaimStatus;
}

export default function CurrentServiceStatus({ status }: IProps) {
  switch (status) {
    case ClaimStatus.Completed:
      return (
        <Icon
          type={"material"}
          name="check-circle"
          color={AppTheme["color-success-500"]}
          size={FontSize.h2}
          containerStyle={{
            marginHorizontal: DefaultMargin,
            marginBottom: 2,
          }}
        />
      );
    default:
      return (
        <NativeView
          marginHorizontal={DefaultMargin}
          paddingVertical={DefaultMargin / 2}
          paddingHorizontal={DefaultMargin}
          backgroundColor={statusColor[status]}
          borderRadius={100}
        >
          <Typography family="regular" size={FontSize.xs - 1} color="white">
            {status.toUpperCase()}
          </Typography>
        </NativeView>
      );
  }
}

export const statusColor: Record<ClaimStatus, string> = {
  Completed: AppTheme["color-success-500"],
  Pending: "orange",
  Assigned: AppTheme["color-primary-300"],
};
