import React from "react";
import NativeCheckBox from "../../../common/components/NativeCheckBox";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { DefaultMargin } from "../../../common/config/themeConfig";
import OrganizationCard from "./organizationCard/OrganizationCard";

export function Explore() {
  return (
    <NativeView marginHorizontal={DefaultMargin} marginTop={DefaultMargin}>
      <OrganizationCard showBooking />
      <NativeCheckBox label="Morning" hint="6 AM - 12 PM" />
    </NativeView>
  );
}
