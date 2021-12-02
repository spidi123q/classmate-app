import React from "react";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import {
  DefaultBorderRadius,
  DefaultMargin,
  DoubleMargin,
  InputHeight,
} from "../../../common/config/themeConfig";
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
import Typography from "../../../common/components/Typography";
import { AppTheme } from "../../../common/config/custom-theme";

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
      <Formik
        initialValues={{ preferredSlot: PreferredSlot.Noon }}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {(formikProps: FormikProps<IBookingEdit>) => (
          <>
            <NativeHeader title="Booking" />
            <NativeView
              type="scroll"
              marginTop={DefaultMargin}
              marginHorizontal={DefaultMargin}
              flex={1}
            >
              <NativeView
                marginTop={DefaultMargin / 2}
                marginBottom={DefaultMargin}
              >
                <OrganizationCard organization={organization} />
              </NativeView>
              <Typography type="xregular" marginBottom={DefaultMargin}>
                Choose preferred time slot
              </Typography>
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
            <NativeView
              marginBottom={DoubleMargin}
              marginHorizontal={DefaultMargin}
            >
              <NativeView
                type="ripple"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingHorizontal={DefaultMargin}
                backgroundColor={AppTheme["color-accent1"]}
                height={InputHeight}
                borderRadius={DefaultBorderRadius}
              >
                <Typography type="h3">Request to Book</Typography>
                <Typography type="h3">₹{organization.price}</Typography>
              </NativeView>
            </NativeView>
          </>
        )}
      </Formik>
    </NativeLayout>
  );
}
