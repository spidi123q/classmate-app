import React, { useState } from "react";
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
import { Formik, FormikProps } from "formik";
import NativeField from "../../../common/components/NativeField";
import { IBookingEdit } from "../../../models/Booking";
import { PreferredSlot } from "../../../models/enum";
import { INativeCheckBoxGroupOptions } from "../../../common/components/NativeCheckboxGroup";
import Typography from "../../../common/components/Typography";
import { AppTheme } from "../../../common/config/custom-theme";
import useLoading from "../../../common/hooks/useLoading";
import useBookingsAPI from "../hooks/useBookingAPI";
import { showToast } from "../../../common/helpers/notification";
import { IError } from "react-native-razorpay";
import { NativeRazorpayCheckout } from "../../../common/native/razorpayCheckout";
import useUser from "../../login/hooks/useUser";
import Loader from "../../../common/components/Loader";

export default function Booking() {
  const navigation = useNavigation<IAppTabrNavigationProp>();
  const { params } = useRoute<RouteProp<IUserStackParamList, "Booking">>();
  const { organization } = params;
  const loading = useLoading();
  const { createElseUpdate } = useBookingsAPI();
  const { name, email, phone } = useUser();
  const [isPaymentCompleted, setIsPaymentCompleted] = useState<boolean>(false);

  const goToMyBooking = () =>
    navigation.navigate("Tabs", {
      screen: "My Bookings",
      params: { reload: true },
    });

  const onSubmit = async (values: IBookingEdit) => {
    try {
      loading.start();
      const draftBooking = await createElseUpdate(values);
      if (!draftBooking.payload?.razorpayOrderId) {
        throw new Error("Draft booking failed");
      }
      const payment = await NativeRazorpayCheckout.open({
        description: `Booking for ${organization.name}`,
        amount: organization.price,
        order_id: draftBooking.payload.razorpayOrderId,
        contact: phone,
        name,
        email,
      });
      await createElseUpdate({
        _id: draftBooking.payload._id,
        active: true,
        paymentDetails: payment,
      });
      loading.stop();
      setIsPaymentCompleted(true);
    } catch (err) {
      showToast(
        "Server error",
        (err as IError).description ?? (err as Error).message,
        "error"
      );
      loading.stop();
    }
  };

  if (isPaymentCompleted) {
    return (
      <NativeLayout lockToPortrait>
        <Loader type="success" onAnimationFinish={goToMyBooking} loop={false} />
      </NativeLayout>
    );
  }

  return (
    <NativeLayout lockToPortrait>
      <Formik<IBookingEdit>
        initialValues={{
          preferredSlot: PreferredSlot.Noon,
          organizationId: organization._id,
        }}
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
              <NativeButton
                paddingHorizontal={DefaultMargin}
                leftText="Request to Book"
                rightText={`₹${organization.price / 100}`}
                backgroundColor="color-accent1"
                isLoading={loading.isLoading}
                onPress={formikProps.submitForm}
              />
            </NativeView>
          </>
        )}
      </Formik>
    </NativeLayout>
  );
}
