import React from "react";
import NativeView from "../../../../common/components/NativeView";
import { ShimmerPlaceHolder } from "../../../../common/config/constants";
import styles, { cardBorderRadius } from "./styles";

export default function ProductCardSkeleton() {
  return (
    <NativeView
      style={[
        styles.container,
        {
          flexDirection: "row",
        },
      ]}
    >
      <ShimmerPlaceHolder
        style={[
          styles.headerContainer,
          { flex: 1, height: 140, borderRadius: cardBorderRadius },
        ]}
      />
    </NativeView>
  );
}
