import React from "react";
import { useNavigation } from "@react-navigation/native";
import AppIntroSlider, {
  ISlide,
} from "../../../common/components/appIntroSlider/AppIntroSlider";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import {
  DefaultFontColor,
  DefaultMargin,
  SubTextLineHeight,
} from "../../../common/config/themeConfig";
import useFirstLauch from "../../../common/hooks/useFirstLauch";
import { FlatListRenderItem } from "../../../common/models/RenderItem";
import { RoutePath } from "../../../models/RoutePath";
import { useWindowDimensions } from "react-native";
import { AppTheme } from "../../../common/config/custom-theme";

export default function Intro() {
  const navigation = useNavigation();
  const { onFirstLaunch } = useFirstLauch();
  const { height, width } = useWindowDimensions();
  const renderItem = ({ item }: FlatListRenderItem<ISlide>) => {
    return (
      <NativeView>
        {item.image && (
          <NativeView
            type="image"
            source={item.image}
            height={height / 1.5}
            width={width}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography
              marginBottom={5}
              type="h2"
              marginHorizontal={DefaultMargin}
            >
              {item.title}
            </Typography>
          </NativeView>
        )}
        <NativeView marginTop={10} marginHorizontal={DefaultMargin}>
          <Typography
            textAlign="center"
            type="xsx"
            color={AppTheme["color-grey3"]}
            lineHeight={SubTextLineHeight}
          >
            {item.description}
          </Typography>
        </NativeView>
      </NativeView>
    );
  };
  const goToLogin = () => {
    onFirstLaunch();
    navigation.navigate(RoutePath.Login);
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
    title: "Real Classes and Real Institutions",
    description:
      "We provide comprehensive live sessions and video call features with subscribed institutions.",
    image: require("../assets/Artboard_1.jpg"),
  },
  {
    key: "2",
    title: "Personalized Sessions",
    description:
      "Create your own learning sessions and subscribe to your favorite lectures or institutions",
    image: require("../assets/Artboard_2.jpg"),
  },
  {
    key: "3",
    title: "Live Sessions and Video Call",
    description:
      "We provide comprehensive live sessions and video call features with subscribed institutions.",
    image: require("../assets/Artboard_3.jpg"),
  },
];
