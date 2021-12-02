import React from "react";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import { DefaultMargin } from "../../../common/config/themeConfig";
import OrganizationCard from "./organizationCard/OrganizationCard";
import NativeButton from "../../../common/components/NativeButton";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  IAppTabrNavigationProp,
  IUserStackParamList,
} from "../../../models/RoutePath";
import { NativeRazorpayCheckout } from "../../../common/native/razorpayCheckout";
import { Formik, FormikProps } from "formik";
import NativeField from "../../../common/components/NativeField";
import { IBookingEdit } from "../../../models/Booking";
import { PreferredSlot } from "../../../models/enum";
import { INativeCheckBoxGroupOptions } from "../../../common/components/NativeCheckboxGroup";

export default function Booking() {
  const navigation = useNavigation<IAppTabrNavigationProp>();
  const { params } = useRoute<RouteProp<IUserStackParamList, "Booking">>();
  const { organization } = params;

  const goToMyBooking = () =>
    navigation.navigate("Tabs", {
      screen: "My Bookings",
    });

  const onSubmit = (values: IBookingEdit) => {
    console.log("🚀 ~ file: Booking.tsx ~ line 26 ~ onSubmit ~ values", values);
  };

  return (
    <NativeLayout lockToPortrait flex={1}>
      <NativeHeader title="Booking" />
      <Formik
        initialValues={{ name: "" }}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {(formikProps: FormikProps<IBookingEdit>) => (
          <NativeView
            type="scroll"
            marginTop={DefaultMargin}
            marginHorizontal={DefaultMargin}
          >
            <NativeView marginTop={DefaultMargin / 2}>
              <OrganizationCard organization={organization} />
            </NativeView>
            <NativeView>
              <NativeField
                type="checkbox"
                name="preferredSlot"
                formikProps={formikProps}
                options={Object.values(
                  PreferredSlot
                ).map<INativeCheckBoxGroupOptions>((slot) => ({
                  Key: slot,
                  Value: slot,
                }))}
              />
            </NativeView>
          </NativeView>
        )}
      </Formik>
    </NativeLayout>
  );
}
