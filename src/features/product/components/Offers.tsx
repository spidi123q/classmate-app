import { Route, useRoute } from "@react-navigation/native";
import React from "react";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeImage from "../../../common/components/NativeImage";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import {
  DefaultBorderRadius,
  DoubleMargin,
} from "../../../common/config/themeConfig";
import IOffer from "../../../models/Offer";

export default function Offers() {
  const route = useRoute<Route<string, IParams | undefined>>();
  const offers = route.params?.offers;

  return (
    <NativeLayout>
      <NativeHeader title="Offers" />
      <NativeView type="scroll" margin={DoubleMargin}>
        {offers &&
          offers.map((offer, index) => (
            <NativeView key={index} marginBottom={DoubleMargin}>
              <NativeImage
                height={200}
                width={"100%" as any}
                firebaseRef={offer.image}
                resizeMode="stretch"
                borderRadius={DefaultBorderRadius}
              />
            </NativeView>
          ))}
      </NativeView>
    </NativeLayout>
  );
}

interface IParams {
  offers: IOffer[];
}
