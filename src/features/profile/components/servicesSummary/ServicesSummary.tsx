import { Formik, FormikHelpers, FormikProps } from "formik";
import moment from "moment";
import React, { createRef, useRef, useState } from "react";
import NativeLayout from "../../../../common/components/NativeLayout";
import Typography from "../../../../common/components/Typography";
import { useNavigation } from "@react-navigation/native";
import {
  DefaultMargin,
  DoubleMargin,
  FontSize,
} from "../../../../common/config/themeConfig";
import { FlatListRenderItem } from "../../../../common/models/RenderItem";
import { FlatList } from "react-native";
import ServiceCard from "./ServiceCard";
import NativeView from "../../../../common/components/NativeView";
import useClaimAPI from "../../hooks/useClaimAPI";
import IClaim, { IClaimQuery } from "../../../../models/Claim";
import usePagination from "../../../../common/hooks/usePagination";
import { DefaultonEndReachedThreshold } from "../../../../common/config/constants";
import { defaultDocKeyExtractor } from "../../../../common/helpers/misc";
import EmpyListPlaceholder from "../../../../common/components/EmpyListPlaceholder";

export default function SellerSummary() {
  const navigation = useNavigation();
  const { getClaims } = useClaimAPI();
  const claimPagination = usePagination<IClaim, IClaimQuery>(getClaims);

  const renderItem = ({ item }: FlatListRenderItem<any>) => (
    <ServiceCard claim={item} />
  );

  return (
    <NativeLayout horizontalMargin>
      <FlatList
        renderItem={renderItem}
        keyExtractor={defaultDocKeyExtractor}
        data={claimPagination.collections}
        onEndReachedThreshold={DefaultonEndReachedThreshold}
        onEndReached={claimPagination.fetchCollections}
        ListFooterComponent={claimPagination.RenderFooter}
        showsVerticalScrollIndicator={false}
        refreshing={claimPagination.showRefreshControl}
        onRefresh={claimPagination.onRefresh}
        ListEmptyComponent={
          <EmpyListPlaceholder
            items={claimPagination.collections}
            isLoading={claimPagination.isLoading}
          />
        }
      />
    </NativeLayout>
  );
}
