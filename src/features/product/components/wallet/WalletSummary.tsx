import { Formik, FormikHelpers, FormikProps } from "formik";
import moment from "moment";
import React, { createRef, useRef, useState } from "react";
import NativeLayout from "../../../../common/components/NativeLayout";
import Typography from "../../../../common/components/Typography";
import useProduct from "../../hooks/useProduct";
import { useNavigation } from "@react-navigation/native";
import {
  DefaultLoaderHeight,
  DefaultMargin,
  FontSize,
} from "../../../../common/config/themeConfig";
import ProductSummaryCard from "../productCard/ProductSummaryCard";
import ProductSellerCard from "../productCard/ProductSellerCard";
import ProductDetailsCard from "../productCard/ProductDetailsCard";
import useProductsDTO from "../../hooks/useProductsDTO";
import { FlatList } from "react-native";
import IProduct from "../../../../models/Product";
import { FlatListRenderItem } from "../../../../common/models/RenderItem";
import TabPageTitle from "../TabPageTitle";
import NativeButton from "../../../../common/components/NativeButton";
import { RoutePath } from "../../../../models/RoutePath";
import EmpyListPlaceholder from "../../../../common/components/EmpyListPlaceholder";
import Loader from "../../../../common/components/Loader";
import ProductCardSkeleton from "../productCard/ProductCardSkeleton";
import ListLoadingPlaceholder from "../../../../common/components/ListLoadingPlaceholder";

export default function WalletSummary() {
  const dto = useProductsDTO();
  const products = dto.getProducts();
  const { isLoadingProduct } = useProduct();

  const renderItem = ({ item }: FlatListRenderItem<IProduct>) => (
    <ProductSummaryCard product={item} />
  );

  return (
    <NativeLayout horizontalMargin>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={<TabPageTitle title="My Warranty Wallet" />}
        ListEmptyComponent={
          <ListLoadingPlaceholder
            items={products}
            isLoading={isLoadingProduct}
            skeleton={<ProductCardSkeleton />}
          />
        }
      />
    </NativeLayout>
  );
}
