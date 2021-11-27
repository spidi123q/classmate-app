import React from "react";
import { TouchableHighlight } from "react-native";
import { CheckBox } from "react-native-elements";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import {
  DefaultBackgroundColor,
  DefaultIconFamily,
  DefaultMargin,
  DefaultPrimaryColor,
} from "../../../common/config/themeConfig";
import OrganizationCard from "./organizationCard/OrganizationCard";
import RazorpayCheckout from "react-native-razorpay";
import NativeButton from "../../../common/components/NativeButton";
import { useNavigation } from "@react-navigation/native";
import {
  ITabNavigationProp,
  RoutePath,
  TabPages,
} from "../../../models/RoutePath";

export default function Booking() {
  const navigation = useNavigation<any>();

  const goToMyBooking = () =>
    navigation.navigate(RoutePath.Dashboard, {
      screen: TabPages.MyBookings,
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
          <OrganizationCard />
          <NativeButton
            title="sadas"
            onPress={() => {
              var options = {
                description: "Credits towards consultation",
                image: "https://i.imgur.com/3g7nmJC.png",
                currency: "INR",
                key: "rzp_test_CqxXRbtceqACE3",
                amount: "5000",
                name: "Acme Corp",
                order_id: "order_IQh9iYKN3ND6CY", //Replace this with an order_id created using Orders API.
                prefill: {
                  email: "gaurav.kumar@example.com",
                  contact: "9191919191",
                  name: "Gaurav Kumar",
                },
                theme: { color: "DefaultBackgroundColor" },
              };
              RazorpayCheckout.open(options)
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
