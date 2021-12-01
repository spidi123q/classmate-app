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

export default function Booking() {
  const navigation = useNavigation<IAppTabrNavigationProp>();
  const { params } = useRoute<RouteProp<IUserStackParamList, "Booking">>();
  const { organization } = params;

  const goToMyBooking = () =>
    navigation.navigate("Tabs", {
      screen: "My Bookings",
    });

  return (
    <NativeLayout lockToPortrait flex={1}>
      <NativeHeader title="Booking" />
      <NativeView
        type="scroll"
        marginTop={DefaultMargin}
        marginHorizontal={DefaultMargin}
      >
        <NativeView marginTop={DefaultMargin / 2}>
          <OrganizationCard organization={organization} />
          <NativeButton
            title="sadas"
            onPress={() => {
              NativeRazorpayCheckout.open({
                description: "test description",
                amount: 5000,
                order_id: "order_ISIKD5aBU6itzK",
              })
                .then((data) => {
                  console.log(
                    "success 🚀 ~ file: Booking.tsx ~ line 63 ~ .then ~ data",
                    JSON.stringify(data)
                  );
                  goToMyBooking();
                })
                .catch((error) => {
                  console.log(
                    "error 🚀 ~ file: Booking.tsx ~ line 67 ~ Booking ~ error",
                    error
                  );
                });
            }}
          />
        </NativeView>
      </NativeView>
    </NativeLayout>
  );
}
