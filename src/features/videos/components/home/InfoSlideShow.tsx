import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import AppIntroSlider, {
  ISlide,
} from "../../../../common/components/appIntroSlider/AppIntroSlider";
import NativeLayout from "../../../../common/components/NativeLayout";
import NativeView from "../../../../common/components/NativeView";
import {
  DefaultMargin,
  MediaBorderRadius,
} from "../../../../common/config/themeConfig";

import { FlatListRenderItem } from "../../../../common/models/RenderItem";

export function InfoSlideShow() {
  const { width } = useWindowDimensions();
  const renderItem = ({ item }: FlatListRenderItem<ISlide>) => {
    return (
      <NativeView justifyContent="center" alignItems="center">
        <NativeView
          type="image"
          source={{
            uri: item.url,
          }}
          height={200}
          width={width - 30}
          alignItems="center"
          justifyContent="flex-end"
          borderRadius={MediaBorderRadius}
        />
      </NativeView>
    );
  };
  const goToLogin = () => {};
  return (
    <NativeLayout scroll lockToPortrait>
      <AppIntroSlider
        showDoneButton={false}
        showSkipButton={false}
        showNextButton={false}
        renderItem={renderItem}
        data={slides}
        onDone={goToLogin}
        onSkip={goToLogin}
        slideShow
      />
    </NativeLayout>
  );
}

const slides: ISlide[] = [
  {
    key: "1",
    url: "https://images.unsplash.com/photo-1633205719979-e47958ff6d93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
  },
  {
    key: "2",
    url: "https://images.unsplash.com/photo-1633205719979-e47958ff6d93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
  },
  {
    key: "3",
    url: "https://images.unsplash.com/photo-1633205719979-e47958ff6d93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
  },
];
