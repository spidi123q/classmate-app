import React from "react";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { DefaultMargin } from "../../../common/config/themeConfig";
import OrganizationCard from "./organizationCard/OrganizationCard";

export function Explore() {
  return (
    <NativeView marginHorizontal={DefaultMargin} marginTop={DefaultMargin}>
      <OrganizationCard showBooking />
    </NativeView>
  );
}
