import { Formik, FormikHelpers, FormikProps } from "formik";
import moment from "moment";
import React, { createRef, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import NativeLayout from "../../../../common/components/NativeLayout";
import Typography from "../../../../common/components/Typography";
import { FontSize } from "../../../../common/config/themeConfig";
import ProductSellerCard from "../productCard/ProductSellerCard";
import { FlatList } from "react-native-gesture-handler";
import { FlatListRenderItem } from "../../../../common/models/RenderItem";
import IProduct from "../../../../models/Product";
import useProductsDTO from "../../hooks/useProductsDTO";
import TabPageTitle from "../TabPageTitle";
import ISeller from "../../../../models/Seller";
import NativeButton from "../../../../common/components/NativeButton";
import { ProductPages } from "../../../../models/RoutePath";
import EmpyListPlaceholder from "../../../../common/components/EmpyListPlaceholder";
import useProduct from "../../hooks/useProduct";
import ProductCardSkeleton from "../productCard/ProductCardSkeleton";
import ListLoadingPlaceholder from "../../../../common/components/ListLoadingPlaceholder";

export default function ServicesSummary() {
  const dto = useProductsDTO();
  const sellers = dto.getSellers();
  const { isLoadingProduct } = useProduct();

  const renderItem = ({ item }: FlatListRenderItem<ISeller>) => (
    <ProductSellerCard
      seller={item}
      productCount={dto.getProductCountBySeller(item._id)}
    />
  );

  return (
    <NativeLayout horizontalMargin>
      <FlatList
        data={sellers}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={<TabPageTitle title="My Sellers" />}
        ListEmptyComponent={
          <ListLoadingPlaceholder
            items={sellers}
            isLoading={isLoadingProduct}
            skeleton={<ProductCardSkeleton />}
          />
        }
      />
    </NativeLayout>
  );
}
