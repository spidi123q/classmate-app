import React from "react";
import { Route, useRoute } from "@react-navigation/native";
import NativeHeader from "../../../../common/components/NativeHeader";
import NativeLayout from "../../../../common/components/NativeLayout";
import NativeView from "../../../../common/components/NativeView";
import ISeller from "../../../../models/Seller";
import ProductSellerDetails from "../productCard/ProductSellerDetails";
import { DoubleMargin } from "../../../../common/config/themeConfig";
import useProductsDTO from "../../hooks/useProductsDTO";
import ProductSummaryCard from "../productCard/ProductSummaryCard";
import TabPageTitle from "../TabPageTitle";

export function SellerDetails() {
  const route = useRoute<Route<string, IParams | undefined>>();
  const seller = route.params!.seller;
  const products = useProductsDTO().getProductsBySeller(seller._id);

  return (
    <NativeLayout>
      <NativeHeader title={seller.name} />
      <NativeView
        type="scroll"
        marginTop={DoubleMargin}
        marginHorizontal={DoubleMargin}
      >
        <ProductSellerDetails seller={seller} />

        <NativeView marginTop={DoubleMargin}>
          <TabPageTitle title={`${seller.name} Products`} />
        </NativeView>
        {products.map((product) => (
          <NativeView marginTop={DoubleMargin} key={product._id}>
            <ProductSummaryCard product={product} />
          </NativeView>
        ))}
      </NativeView>
    </NativeLayout>
  );
}

interface IParams {
  seller: ISeller;
}
