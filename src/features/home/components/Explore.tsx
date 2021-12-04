import React from "react";
import { FlatList } from "react-native";
import EmpyListPlaceholder from "../../../common/components/EmpyListPlaceholder";
import ListLoadingPlaceholder from "../../../common/components/ListLoadingPlaceholder";
import NativeCheckBox from "../../../common/components/NativeCheckBox";
import { NativeSkeletonPlaceholder } from "../../../common/components/nativeSkeleton";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { DefaultonEndReachedThreshold } from "../../../common/config/constants";
import { DefaultMargin } from "../../../common/config/themeConfig";
import { defaultDocKeyExtractor } from "../../../common/helpers/misc";
import usePagination from "../../../common/hooks/usePagination";
import { FlatListRenderItem } from "../../../common/models/RenderItem";
import IOrganization, {
  IOrganizationQuery,
} from "../../../models/Organization";
import useOrganizationAPI from "../hooks/useOrganizationAPI";
import OrganizationCard from "./organizationCard/OrganizationCard";

export function Explore() {
  const { getOrganizations } = useOrganizationAPI();
  const organizationPagination =
    usePagination<IOrganization, IOrganizationQuery>(getOrganizations);

  const renderItem = ({ item }: FlatListRenderItem<IOrganization>) => (
    <NativeView marginBottom={DefaultMargin}>
      <OrganizationCard organization={item} />
    </NativeView>
  );

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
