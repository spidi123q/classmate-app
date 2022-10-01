import React from "react";
import NativeLayout from "../../../common/components/NativeLayout";
import { FlatGrid } from "react-native-super-grid";
import Typography from "../../../common/components/Typography";
import NativeView from "../../../common/components/NativeView";
import { ItemDimension, MainCategory } from "./MainCategory";
import NativeHeader from "../../../common/components/NativeHeader";
import { HomePages } from "../../../models/RoutePath";

export function DocumentSummary() {
  return (
    <NativeLayout>
      <FlatGrid
        itemDimension={ItemDimension}
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={({ item }) => <MainCategory />}
      />
    </NativeLayout>
  );
}
