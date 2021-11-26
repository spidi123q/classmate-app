import React from "react";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { DefaultMargin } from "../../../common/config/themeConfig";
import OrganizationCard from "./organizationCard/OrganizationCard";

export interface IProps {
  prop?: string;
}

export function MyBookings(props: IProps) {
  return (
    <NativeView marginHorizontal={DefaultMargin} marginTop={DefaultMargin}>
      <OrganizationCard showSchedule />
    </NativeView>
  );
}
