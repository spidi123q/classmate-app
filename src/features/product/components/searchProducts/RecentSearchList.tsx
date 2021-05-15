import { dropRight, take } from "lodash";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import IconList from "../../../../common/components/IconList";
import NativeView from "../../../../common/components/NativeView";
import SubSection from "../../../../common/components/SubSection";
import { AppTheme } from "../../../../common/config/custom-theme";
import {
  DefaultIconFamily,
  FontSize,
  DefaultMargin,
  DoubleMargin,
} from "../../../../common/config/themeConfig";
import useRecentSearch from "../../../../common/hooks/useRecentSearch";

interface IProps {
  setSearchTerm: (searchTerm: string) => any;
}

export default function RecentSearchList({ setSearchTerm }: IProps) {
  const { recentSearch } = useRecentSearch();
  const recentSearches = take(recentSearch, 5).map((searchTerm) => ({
    label: searchTerm,
    iconName: "time-outline",
    onPress: () => setSearchTerm(searchTerm),
  }));

  return (
    <NativeView type="scroll">
      <SubSection title="RECENT SEARCH" marginHorizontal={DoubleMargin}>
        <IconList
          textColor={AppTheme["color-grey3"]}
          iconColor={AppTheme["color-grey3"]}
          list={recentSearches}
        />
      </SubSection>
    </NativeView>
  );
}
