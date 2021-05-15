import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image } from "react-native";
import Counter from "../../../../common/components/Counter";
import NativeButton from "../../../../common/components/NativeButton";
import NativeView from "../../../../common/components/NativeView";
import SubSection from "../../../../common/components/SubSection";
import TemplateList from "../../../../common/components/TemplateList";
import Typography from "../../../../common/components/Typography";
import {
  DefaultMargin,
  DoubleMargin,
  FontSize,
} from "../../../../common/config/themeConfig";
import { formatDate } from "../../../../common/helpers/formatDate";
import IProduct from "../../../../models/Product";
import { ProductPages } from "../../../../models/RoutePath";
import ProductCard from "./ProductCard";
import ProductHeader from "./ProductHeader";
import ProductTitle from "./ProductTitle";
import styles from "./styles";

interface IProps {
  product: IProduct;
}

export default function ProductDetailsCard({ product }: IProps) {
  const navigation = useNavigation();
  const onViewMore = (title: string) =>
    navigation.navigate(ProductPages.CompleteProductDetails, {
      product: { ...product },
      title,
    });

  const openClaim = () =>
    navigation.navigate(ProductPages.ProductClaim, {
      product,
    });
  return (
    <ProductCard
      noHeaderLogo
      headerBody={<ProductTitle logoRef={product.brand.logo} />}
      subHeaderBody={
        <ProductHeader
          title={product.name}
          subHeading={"Warranty Expire on"}
          subHeading2={formatDate(product.expiresAt)}
          productImageRef={product.coverImage}
          marginVertical={DefaultMargin * 2}
        />
      }
      footerBody={<View style={styles.detailsFooterContainer} />}
      body={
        <NativeView>
          {product.template.sections.map((section) => {
            switch (section.name) {
              case "Warranty Details":
                return (
                  <SubSection
                    key={section.name}
                    title={section.name}
                    onViewMore={onViewMore}
                    borderBottom
                  >
                    <NativeView marginBottom={DoubleMargin}>
                      <Counter date={product.expiresAt} horizontal />
                    </NativeView>
                    <NativeView
                      justifyContent="center"
                      alignItems="center"
                      marginBottom={DoubleMargin}
                    >
                      <NativeButton
                        width={150}
                        size="sm"
                        title="Claim my warranty"
                        onPress={openClaim}
                      />
                    </NativeView>
                  </SubSection>
                );
              default:
                return (
                  <SubSection
                    key={section.name}
                    title={section.name}
                    onViewMore={onViewMore}
                  >
                    <TemplateList
                      fields={section.fields}
                      value={product}
                      maxItems={maxSectionItems}
                    />
                  </SubSection>
                );
            }
          })}
        </NativeView>
      }
    />
  );
}
const maxSectionItems = 2;
