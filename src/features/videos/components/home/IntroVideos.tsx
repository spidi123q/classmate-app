import { useNavigation } from "@react-navigation/native";
import { isEmpty, truncate } from "lodash";
import React from "react";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import {
  DefaultBorderRadius,
  DefaultHintFontColor,
  DefaultMargin,
} from "../../../../common/config/themeConfig";
import { IRootStackNavigationProps } from "../../../../models/RoutePath";
import useVideo from "../../hooks/useVideo";
import { Image } from "react-native-elements";
import IVideo from "../../../../models/Video";
import useVideoActions from "../../hooks/useVideoActions";

export function IntroVideos() {
  const { videoSummary } = useVideo();
  const navigation = useNavigation<IRootStackNavigationProps>();
  const videos = videoSummary.docs.filter((video) =>
    isEmpty(video.classroomId)
  );
  const { setLastPlayedVideo } = useVideoActions();

  const openVideo = (video: IVideo) => {
    setLastPlayedVideo(video);
    navigation.navigate("Video Details", {
      video,
    });
  };

  return (
    <NativeView marginHorizontal={DefaultMargin}>
      {videos.map((video) => (
        <NativeView
          type="ripple"
          marginTop={DefaultMargin / 2}
          onPress={() => openVideo(video)}
        >
          <Image
            source={{
              uri: video.coverImageUrl,
            }}
            style={{
              width: "100%",
              height: 175,
              borderRadius: DefaultBorderRadius,
            }}
          />
          <Typography
            family="medium"
            marginTop={DefaultMargin / 4}
            numberOfLines={1}
          >
            {truncate(video.name, {
              length: 20,
            })}
          </Typography>
          {video.duration && (
            <Typography type="xsx" color={DefaultHintFontColor}>
              {Math.floor(video.duration / 60)} mins
            </Typography>
          )}
        </NativeView>
      ))}
    </NativeView>
  );
}
