import React from "react";
import { useNavigation } from "@react-navigation/native";
import AppIntroSlider from "../../../common/components/appIntroSlider/AppIntroSlider";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { DoubleMargin, FontSize } from "../../../common/config/themeConfig";
import useFirstLauch from "../../../common/hooks/useFirstLauch";
import { FlatListRenderItem } from "../../../common/models/RenderItem";
import { RoutePath } from "../../../models/RoutePath";
import BrandIntro from "../assets/BrandIntro.svg";
import HelpIntro from "../assets/HelpIntro.svg";

export default function Intro() {
  const navigation = useNavigation();
  const { onFirstLaunch } = useFirstLauch();
  const renderItem = ({ item }: FlatListRenderItem<ISlide>) => {
    return (
      <NativeView flex={1} justifyContent="center" alignItems="center">
        <NativeView>{item.image}</NativeView>
        <Typography marginTop={DoubleMargin} size={FontSize.h1x} family="bold">
          {item.title}
        </Typography>
        <Typography
          textAlign="center"
          marginTop={DoubleMargin}
          lineHeight={DoubleMargin}
        >
          {item.description}
        </Typography>
      </NativeView>
    );
  };
  const goToLogin = () => {
    onFirstLaunch();
    navigation.navigate(RoutePath.Login);
  };

  const slides: ISlide[] = [
    {
      key: "1",
      title: "All your brands",
      description:
        "One stop for all your devices.\nManage warranty and services",
      image: <BrandIntro />,
    },
    {
      key: "2",
      title: "24x7 Service",
      description:
        "We help you anywhere anytime.\nWill never forget once again",
      image: <HelpIntro />,
    },
  ];

  return (
    <AppIntroSlider
      showSkipButton
      renderItem={renderItem}
      data={slides}
      onDone={goToLogin}
      onSkip={goToLogin}
    />
  );
}

interface ISlide {
  key: string;
  title: string;
  description: string;
  image: JSX.Element;
}
