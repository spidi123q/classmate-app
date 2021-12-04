import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import EmpyListPlaceholder from "../../../common/components/EmpyListPlaceholder";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { DefaultonEndReachedThreshold } from "../../../common/config/constants";
import { DefaultMargin } from "../../../common/config/themeConfig";
import { defaultDocKeyExtractor } from "../../../common/helpers/misc";
import usePagination from "../../../common/hooks/usePagination";
import { FlatListRenderItem } from "../../../common/models/RenderItem";
import IBooking, { IBookingQuery } from "../../../models/Booking";
import { ITabParamList } from "../../../models/RoutePath";
import useBookingAPI from "../hooks/useBookingAPI";
import OrganizationCard from "./organizationCard/OrganizationCard";

export interface IProps {
  prop?: string;
}

export function MyBookings(props: IProps) {
  const { getBookings } = useBookingAPI();
  const organizationPagination = usePagination<IBooking, IBookingQuery>(
    (query) =>
      getBookings({
        ...query,
        active: true,
      })
  );
  const route = useRoute<RouteProp<ITabParamList, "My Bookings">>();

  const renderItem = ({ item }: FlatListRenderItem<IBooking>) => (
    <NativeView marginBottom={DefaultMargin}>
      <OrganizationCard booking={item} />
    </NativeView>
  );

  useEffect(() => {
    if (route.params?.reload) {
      organizationPagination.onRefresh();
    }
  }, [route.params?.reload]);

  return (
    <NativeView
      marginHorizontal={DefaultMargin}
      marginTop={DefaultMargin}
      flex={1}
    >
      <FlatList
        keyExtractor={defaultDocKeyExtractor}
        data={organizationPagination.collections}
        renderItem={renderItem}
        onEndReachedThreshold={DefaultonEndReachedThreshold}
        onEndReached={organizationPagination.fetchCollections}
        ListFooterComponent={organizationPagination.RenderFooter}
        showsVerticalScrollIndicator={false}
        refreshing={organizationPagination.showRefreshControl}
        onRefresh={organizationPagination.onRefresh}
        ListEmptyComponent={
          <EmpyListPlaceholder
            items={organizationPagination.collections}
            isLoading={organizationPagination.isLoading}
          />
        }
      />
    </NativeView>
  );
}
