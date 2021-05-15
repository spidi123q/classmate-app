import { Route, useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import NativeHeader from "../../../../../common/components/NativeHeader";
import NativeLayout from "../../../../../common/components/NativeLayout";
import IProduct from "../../../../../models/Product";
import ProductDetailsCard from "../../productCard/ProductDetailsCard";
import styles from "./ProductDetails.style";

export default function ProductDetails() {
  const route = useRoute<Route<string, IParams | undefined>>();
  const product = route.params!.product;
  return (
    <NativeLayout>
      <NativeHeader title={product.name} />
      <ScrollView style={styles.container}>
        <ProductDetailsCard product={product} />
      </ScrollView>
    </NativeLayout>
  );
}

interface IParams {
  product: IProduct;
}
