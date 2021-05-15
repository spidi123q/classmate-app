import React from "react";
import { View, Image } from "react-native";
import Typography from "../../../../common/components/Typography";
import { DefaultMargin, FontSize } from "../../../../common/config/themeConfig";
import ProductCard from "./ProductCard";
import styles from "./styles";
import Discount from "../../../../common/assets/Discount.svg";
import ProductTitle from "./ProductTitle";
import IProduct from "../../../../models/Product";
import ISeller from "../../../../models/Seller";
import { useNavigation } from "@react-navigation/native";
import { ProductPages } from "../../../../models/RoutePath";

interface IProps {
  seller: ISeller;
  productCount: number;
}

export default function ProductSellerCard({ seller, productCount }: IProps) {
  const navigation = useNavigation();
  const openSeller = () =>
    navigation.navigate(ProductPages.SellerDetails, { seller });
  return (
    <ProductCard
      noHeaderLogo
      footerBG
      headerBody={
        <ProductTitle height={100} logoRef={seller.logo} onPress={openSeller} />
      }
      footerBody={
        <View style={styles.sellerFooterContainer}>
          <View style={styles.sellerCountContainer}>
            <Typography color="white">Total Products</Typography>
            <Typography
              size={FontSize.h2}
              color="white"
              marginLeft={DefaultMargin}
            >
              {productCount}
            </Typography>
          </View>
          <View style={styles.sellerCountContainer}>
            <Discount />
            <Typography marginLeft={DefaultMargin} color="white">
              Offers Available
            </Typography>
          </View>
        </View>
      }
    />
  );
}
