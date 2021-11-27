import React from "react";
import { CheckBox } from "react-native-elements";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import {
  DefaultIconFamily,
  DefaultMargin,
} from "../../../common/config/themeConfig";
import OrganizationCard from "./organizationCard/OrganizationCard";

export default function Booking() {
  return (
    <NativeLayout lockToPortrait flex={1}>
      <NativeHeader title="Booking" />
      <NativeView
        type="scroll"
        marginTop={DefaultMargin}
        marginHorizontal={DefaultMargin}
      >
        <NativeView marginTop={DefaultMargin / 2}>
          <OrganizationCard />
        </NativeView>
      </NativeView>
    </NativeLayout>
  );
}
