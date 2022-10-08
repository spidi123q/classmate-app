import React from "react";
import { useNavigation } from "@react-navigation/native";
import AppIntroSlider, {
  ISlide,
} from "../../../common/components/appIntroSlider/AppIntroSlider";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import {
  DefaultFontColor,
  DefaultHintFontColor,
  DefaultMargin,
  SubTextLineHeight,
} from "../../../common/config/themeConfig";
import useFirstLauch from "../../../common/hooks/useFirstLauch";
import { FlatListRenderItem } from "../../../common/models/RenderItem";
import { ILoginStackNavigationProps } from "../../../models/RoutePath";
import { useWindowDimensions } from "react-native";
import { AppTheme } from "../../../common/config/custom-theme";
import LogoHorizontal from "../../../common/assets/LogoHorizontal.svg";
import NativeLayout from "../../../common/components/NativeLayout";

export default function Intro() {
  const navigation = useNavigation<ILoginStackNavigationProps>();

  const { onFirstLaunch } = useFirstLauch();
  const { height, width } = useWindowDimensions();
  const renderItem = ({ item }: FlatListRenderItem<ISlide>) => {
    return (
      <NativeLayout>
        <NativeView flex={1} justifyContent="center" alignItems="center">
          <LogoHorizontal height={33} />
          {item.image && (
            <NativeView
              type="image"
              source={item.image}
              height={height / 2}
              width={width}
              alignItems="center"
              justifyContent="flex-end"
            />
          )}
          <NativeView marginTop={10} marginHorizontal={DefaultMargin}>
            <Typography
              marginBottom={5}
              type="h2"
              family="bold"
              marginHorizontal={DefaultMargin}
              textAlign="center"
            >
              {item.title}
            </Typography>
            <Typography
              textAlign="center"
              type="xsx"
              color={DefaultHintFontColor}
              lineHeight={SubTextLineHeight}
              paddingTop={DefaultMargin / 2}
            >
              {item.description}
            </Typography>
          </NativeView>
        </NativeView>
      </NativeLayout>
    );
  };
  const goToLogin = () => {
    onFirstLaunch();
    navigation.navigate("Login");
  };

  return (
    <AppIntroSlider
      showSkipButton
      renderItem={renderItem}
      data={slides}
      onDone={goToLogin}
      onSkip={goToLogin}
      doneLabel="Get Started"
      footer={
        <Typography
          color={AppTheme["color-grey3"]}
          marginVertical={DefaultMargin}
          type="h3"
        >
          Already have account?{" "}
          <Typography type="h3" color={DefaultFontColor} onPress={goToLogin}>
            {" "}
            Login
          </Typography>
        </Typography>
      }
    />
  );
}

const slides: ISlide[] = [
  {
    key: "1",
    title: "Welcome to B-Seven",
    description:
      "A comprehensive e-learning platform for IELTS and spoken English.",
    image: require("../assets/Artboard_1.jpg"),
  },
  {
    key: "2",
    title: "Seamless learning experience",
    description:
      "B7 provides rich video and text contents for easy and fast learning experience",
    image: require("../assets/Artboard_2.jpg"),
  },
  {
    key: "3",
    title: "Fully featured live meetings",
    description:
      "Provides best in class live online classes with latest features",
    image: require("../assets/Artboard_3.jpg"),
  },
];
