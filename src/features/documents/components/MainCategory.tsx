import React from "react";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { AppTheme } from "../../../common/config/custom-theme";
import {
  DeafultBorderColor,
  DefaultBorderRadius,
  DefaultFontColor,
  DefaultHintFontColor,
  DefaultMargin,
} from "../../../common/config/themeConfig";
import Icon from "react-native-remix-icon";
import { useNavigation } from "@react-navigation/native";
import {
  HomePages,
  IRootStackNavigationProps,
} from "../../../models/RoutePath";
import { IBook } from "../../../models/Book";
import { find, size } from "lodash";
import useUser from "../../login/hooks/useUser";

interface IProps {
  mainCategory: string;
  books: IBook[];
}

export function MainCategory(props: IProps) {
  const { mainCategory, books } = props;
  const { classroom } = useUser();

  const navigation = useNavigation<IRootStackNavigationProps>();
  const category = find(classroom?.categories, {
    name: mainCategory,
  });
  return (
    <NativeView
      type="ripple"
      borderWidth={1}
      borderColor={DeafultBorderColor}
      height={ItemDimension}
      borderRadius={DefaultBorderRadius}
      justifyContent="center"
      alignItems="center"
      onPress={() =>
        navigation.navigate("View Documents", {
          books,
        })
      }
    >
      <NativeView justifyContent="center" alignItems="center">
        <NativeView
          borderWidth={2}
          height={46}
          width={46}
          borderRadius={DefaultBorderRadius}
          borderColor={DeafultBorderColor}
          justifyContent="center"
          alignItems="center"
        >
          <Icon
            name={category?.iconName ?? 'ri-bill-line"'}
            color={DefaultFontColor}
            size={24}
          />
        </NativeView>
        <Typography
          type="h3"
          marginTop={DefaultMargin / 2}
          marginBottom={DefaultMargin / 4}
        >
          {mainCategory}
        </Typography>
        <Typography color={DefaultHintFontColor} type="xsx">
          {size(books)} items
        </Typography>
      </NativeView>
    </NativeView>
  );
}

export const ItemDimension = 150;
