import React from "react";
import IconButton from "../../../../common/components/IconButton";
import IconList from "../../../../common/components/IconList";
import NativeButton from "../../../../common/components/NativeButton";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import {
  FontSize,
  DefaultMargin,
  DoubleMargin,
  DefaultIconFamily,
} from "../../../../common/config/themeConfig";
import ISeller from "../../../../models/Seller";
import ProductCard from "./ProductCard";
import ProductTitle from "./ProductTitle";
import styles from "./styles";
import Discount from "../../../../common/assets/Discount.svg";
import ForwardArrow from "../../../../common/assets/ForwardArrow.svg";
import { useNavigation } from "@react-navigation/native";
import { ProductPages } from "../../../../models/RoutePath";
import { openURL } from "../../../../common/helpers/platform";

interface IProps {
  seller: ISeller;
}

export default function ProductSellerDetails({ seller }: IProps) {
  const navigation = useNavigation();

  const viewOffers = () =>
    navigation.navigate(ProductPages.Offers, { offers: seller.offers });

  const listItems = [];

  if (seller.website) {
    listItems.push({
      label: seller.website,
      iconName: "globe-outline",
      onPress: () => openURL(seller.website),
    });
  }

  if (seller.email) {
    listItems.push({
      label: seller.email,
      iconName: "mail-outline",
      onPress: () => openURL(seller.email, "mail"),
    });
  }

  const openHelp = () => openURL(seller.phone, "tel");

  return (
    <ProductCard
      noHeaderLogo
      noBodyLogo
      headerBody={
        <NativeView
          marginBottom={DoubleMargin}
          borderBottomWidth={1}
          borderBottomColor={AppTheme["color-grey"]}
          marginHorizontal={DoubleMargin}
          flex={1}
        >
          <ProductTitle height={100} logoRef={seller.logo} logoHeight={50} />
        </NativeView>
      }
      body={
        <NativeView marginHorizontal={DoubleMargin}>
          <IconList list={listItems} />
          <NativeView
            marginVertical={DoubleMargin}
            flexDirection="row"
            justifyContent="space-evenly"
          >
            <IconButton gradient label="Products">
              <Typography size={FontSize.h1} color="white" marginTop={2}>
                1
              </Typography>
            </IconButton>
            <IconButton
              onPress={openHelp}
              iconName="headset-outline"
              label="Help"
            />
          </NativeView>
          <NativeView marginVertical={DoubleMargin} justifyContent="center">
            <NativeButton
              mode="square"
              title="View Offers"
              height={55}
              onPress={viewOffers}
            >
              <NativeView
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
                width={"100%"}
              >
                <Discount width={FontSize.h1} height={FontSize.h1} />
                <Typography color="white" size={FontSize.h2}>
                  View Offers
                </Typography>
                <ForwardArrow width={FontSize.h1} height={FontSize.h1} />
              </NativeView>
            </NativeButton>
          </NativeView>
        </NativeView>
      }
      footerBody={<NativeView height={DoubleMargin} />}
    />
  );
}
