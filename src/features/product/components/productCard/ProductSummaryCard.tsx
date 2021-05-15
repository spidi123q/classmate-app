import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image } from "react-native";
import Counter from "../../../../common/components/Counter";
import NativeImage from "../../../../common/components/NativeImage";
import Typography from "../../../../common/components/Typography";
import { DefaultMargin, FontSize } from "../../../../common/config/themeConfig";
import { formatDate } from "../../../../common/helpers/formatDate";
import IProduct from "../../../../models/Product";
import { ProductPages, RoutePath } from "../../../../models/RoutePath";
import ProductCard from "./ProductCard";
import ProductHeader from "./ProductHeader";
import styles from "./styles";

interface IProps {
  product: IProduct;
}

export default function ProductSummaryCard({ product }: IProps) {
  const navigation = useNavigation();

  const onViewMore = () => {
    navigation.navigate(ProductPages.ProductDetails, { product });
  };
  return (
    <ProductCard
      headerBG
      noBodyLogo
      onViewMore={onViewMore}
      headerBody={
        <ProductHeader
          title={product.name}
          subHeading={"Warranty Expire on"}
          subHeading2={formatDate(product.expiresAt)}
          productImageRef={product.coverImage}
        />
      }
      footerBody={
        <View style={styles.footerBody}>
          <Counter date={product.expiresAt} />
          <NativeImage
            style={styles.footerLogo}
            resizeMode="center"
            firebaseRef={product.brand.logo}
          />
        </View>
      }
    />
  );
}
