import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Platform, StatusBar, useWindowDimensions } from "react-native";
import NativeButton from "../../../../common/components/NativeButton";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import {
  DefaultHintFontColor,
  DefaultMargin,
  DefaultOpacity,
} from "../../../../common/config/themeConfig";
import useVideo from "../../hooks/useVideo";
import useUser from "../../../login/hooks/useUser";
import { first } from "lodash";
import useVideoActions from "../../hooks/useVideoActions";
import IVideo from "../../../../models/Video";
import { IRootStackNavigationProps } from "../../../../models/RoutePath";
import {
  IJitsiMeetUserInfo,
  RNJitsiMeet,
} from "../../../../common/native/jitsiMeet";
import { getJitsiUrl } from "../../../../common/helpers/misc";
import { NativeSkeletonPlaceholder } from "../../../../common/components/nativeSkeleton";
import { Button } from "react-native-elements";
import RedPlay from "../../assets/RedPlay.svg";
import { IPaginateResult } from "../../../../common/models/PaginateResult";

interface IProps {
  isLoading?: boolean;
  videoSummary: IPaginateResult<IVideo>;
}

export function HeaderCover(props: IProps) {
  const { isLoading, videoSummary } = props;
  const { height, width } = useWindowDimensions();
  const { lastPlayedVideo } = useVideo();
  const { classroom, name } = useUser();
  const video = lastPlayedVideo ?? first(videoSummary.docs);
  const navigation = useNavigation<IRootStackNavigationProps>();
  const { setLastPlayedVideo } = useVideoActions();
  const isLive = classroom?.liveDetails?.isLive;

  const openVideo = (video: IVideo) => {
    setLastPlayedVideo(video);
    navigation.navigate("Video Details", {
      video,
    });
  };

  const onPlay = (video?: IVideo) => {
    if (isLive) {
      const roomName = classroom?.liveDetails?.roomName ?? "";
      const url = getJitsiUrl(roomName);
      const userInfo: IJitsiMeetUserInfo = {
        displayName: name,
      };

      if (Platform.OS === "ios" || Platform.OS === "web") {
        navigation.navigate("Live", {
          url,
          userInfo,
          roomName,
        });
      } else if (Platform.OS === "android") {
        RNJitsiMeet.join(url, userInfo);
      }
    } else {
      video && openVideo(video);
    }
  };

  return (
    <NativeView justifyContent="flex-end">
      <NativeView marginHorizontal={DefaultMargin} flexDirection="row">
        <NativeView
          marginBottom={DefaultMargin / 2}
          flexDirection="row"
          alignItems="center"
        >
          <Button
            type="clear"
            icon={<RedPlay />}
            onPress={() => onPlay(video)}
          />
          {isLive ? (
            <NativeView>
              <Typography family="medium" type="h3x">
                {classroom?.name}
              </Typography>
              <Typography type="xs" color={AppTheme["color-danger"]}>
                Live
              </Typography>
            </NativeView>
          ) : (
            <NativeView>
              <Typography type="xs" color={DefaultHintFontColor}>
                {classroom?.name} · {video?.category}
              </Typography>
              <Typography family="medium" type="h3x">
                {video?.name}
              </Typography>
            </NativeView>
          )}
        </NativeView>
      </NativeView>
    </NativeView>
  );
}
