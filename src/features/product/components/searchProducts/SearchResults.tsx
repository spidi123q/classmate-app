import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, SectionList, SectionListData } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import NativeAvatar from "../../../../common/components/NativeAvatar";
import NativeImage from "../../../../common/components/NativeImage";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import {
  DoubleMargin,
  FontSize,
  SecondaryBackgroundColor,
} from "../../../../common/config/themeConfig";
import useRecentSearch from "../../../../common/hooks/useRecentSearch";
import {
  FlatListRenderItem,
  NativeSectionListRenderItem,
} from "../../../../common/models/RenderItem";
import IBrand from "../../../../models/Brand";
import IProduct from "../../../../models/Product";
import { ProductPages } from "../../../../models/RoutePath";
import ISeller from "../../../../models/Seller";
import useProductsDTO from "../../hooks/useProductsDTO";
import RecentSearchList from "./RecentSearchList";

interface IProps {
  searchTerm?: string;
}

export default function SearchResults({ searchTerm }: IProps) {
  const productDTO = useProductsDTO();
  const navigation = useNavigation();
  const { add } = useRecentSearch();

  const openItem = (item: IProduct | ISeller, section: SearchSections) => {
    searchTerm && add(searchTerm);
    switch (section) {
      case SearchSections.Products:
        navigation.navigate(ProductPages.ProductDetails, { product: item });
        break;

      case SearchSections.Sellers:
        navigation.navigate(ProductPages.SellerDetails, { seller: item });
        break;
    }
  };

  const result = productDTO.search(searchTerm);

  const DATA: SectionListData<any, Record<string, any>>[] = [
    {
      name: SearchSections.Products,
      data: result.getProducts(),
    },
    {
      name: SearchSections.Sellers,
      data: result.getSellers(),
    },
  ];

  const keyExtractor = (item: any, index: number) => item._id;

  const renderNoContent = ({ section }: any) => {
    if (section.data.length == 0) {
      return (
        <Typography
          color={AppTheme["color-grey3"]}
          size={FontSize.xs}
          marginVertical={DoubleMargin}
          family="semiBold"
        >
          Nothing found
        </Typography>
      );
    }
    return null;
  };

  const renderItem = ({
    item,
    section,
  }: NativeSectionListRenderItem<IProduct & ISeller & IBrand, any>) => {
    const isProduct = section.name === SearchSections.Products;
    return (
      <ListItem bottomDivider onPress={() => openItem(item, section.name)}>
        <GetLeftAvatar type={section.name} data={item} />
        <ListItem.Content>
          <ListItem.Title>
            {isProduct && (
              <Typography family="semiBold" size={FontSize.h3}>
                {item.name}
              </Typography>
            )}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <NativeView marginHorizontal={DoubleMargin}>
      <SectionList
        sections={DATA}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={({ section: { name } }) => (
          <NativeView backgroundColor={SecondaryBackgroundColor}>
            <Typography
              color={AppTheme["color-grey3"]}
              marginVertical={DoubleMargin}
            >
              {name}
            </Typography>
          </NativeView>
        )}
        renderSectionFooter={renderNoContent}
      />
    </NativeView>
  );
}

interface IAvatar {
  type: SearchSections;
  data: IData;
}

const GetLeftAvatar = ({ type, data }: IAvatar) => {
  switch (type) {
    case SearchSections.Products:
      return <NativeAvatar firebaseRef={data.coverImage} />;
    default:
      return (
        <NativeImage
          height={imageSize}
          width={imageSize * 2}
          resizeMode="center"
          firebaseRef={data.logo}
        />
      );
  }
};

const imageSize = 35;

enum SearchSections {
  Products = "PRODUCTS",
  Sellers = "SELLERS",
  Brands = "BRANDS",
}
type IData = IProduct & ISeller & IBrand;
