import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Button, Icon } from "react-native-elements";
import NativeHeader from "../../../../common/components/NativeHeader";
import NativeLayout from "../../../../common/components/NativeLayout";
import NativeTextInput from "../../../../common/components/NativeTextInput";
import NativeView from "../../../../common/components/NativeView";
import SubSection from "../../../../common/components/SubSection";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import {
  DefaultBorderRadius,
  DefaultIconFamily,
  DefaultMargin,
  DefaultOpacity,
  DoubleMargin,
  FontSize,
  PageBorderRadius,
  SecondaryBackgroundColor,
} from "../../../../common/config/themeConfig";
import RecentSearchList from "./RecentSearchList";
import SearchResults from "./SearchResults";

export default function SearchProducts() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  const onSearch = (input: string) => {
    setSearchTerm(input);
  };
  return (
    <NativeLayout>
      <NativeHeader
        noBorder
        title="Search"
        component={
          <NativeView marginHorizontal={DoubleMargin}>
            <NativeTextInput
              autoFocus
              iconName="search-outline"
              size="lg"
              placeholder="Search    "
              onChangeText={onSearch}
              value={searchTerm}
            />
          </NativeView>
        }
      />
      <NativeView
        marginTop={DoubleMargin}
        paddingTop={DoubleMargin}
        backgroundColor={SecondaryBackgroundColor}
        flex={1}
        borderTopLeftRadius={PageBorderRadius}
        borderTopRightRadius={PageBorderRadius}
      >
        {isEmpty(searchTerm) ? (
          <RecentSearchList setSearchTerm={setSearchTerm} />
        ) : (
          <SearchResults searchTerm={searchTerm} />
        )}
      </NativeView>
    </NativeLayout>
  );
}
