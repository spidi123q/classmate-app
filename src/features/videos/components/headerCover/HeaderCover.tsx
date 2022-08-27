import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Platform, StatusBar, useWindowDimensions } from "react-native";
import NativeButton from "../../../../common/components/NativeButton";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import { HeaderMenu } from "./HeaderMenu";
import Live from "../../assets/Live.svg";
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
import { HomePages } from "../../../../models/RoutePath";
import { IParam } from "../VideoDetails";
import {
  IJitsiMeetUserInfo,
  RNJitsiMeet,
} from "../../../../common/native/jitsiMeet";
import { getJitsiUrl } from "../../../../common/helpers/misc";
import { NativeSkeletonPlaceholder } from "../../../../common/components/nativeSkeleton";
import Airboard2 from "../../../login/assets/Artboard_2.jpg";

interface IProps {
  isLoading?: boolean;
}

export default function HeaderCover(props: IProps) {
  const { isLoading } = props;
  const { height, width } = useWindowDimensions();
  const coverHeight = height / 1.95;
  const { videoSummary, lastPlayedVideo } = useVideo();
  const { classroom, name } = useUser();
  const video = lastPlayedVideo ?? first(videoSummary.docs);
  const navigation = useNavigation();
  const { setLastPlayedVideo } = useVideoActions();
  const isLive = classroom?.liveDetails?.isLive;

  const openVideo = (video: IVideo) => {
    setLastPlayedVideo(video);
    navigation.navigate(HomePages.VideoDetails, {
      video,
    } as IParam);
  };

  const onPlay = (video?: IVideo) => {
    if (isLive) {
      const roomName = classroom?.liveDetails?.roomName ?? "";
      const url = getJitsiUrl(roomName);
      const userInfo: IJitsiMeetUserInfo = {
        displayName: name,
      };

      if (Platform.OS === "ios" || Platform.OS === "web") {
        navigation.navigate(HomePages.JitsiMeet, {
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
    <NativeView>
      <StatusBar translucent />
      <NativeView marginBottom={20}>
        <HeaderMenu />
      </NativeView>
      <NativeView justifyContent="flex-end">
        <NativeView marginHorizontal={DefaultMargin}>
          <NativeView marginBottom={DefaultMargin / 2}>
            {isLive ? (
              <>
                <Typography family="medium" type="h3x">
                  {classroom?.name}
                </Typography>
              </>
            ) : (
              <>
                <Typography family="medium" type="h3x">
                  {video?.name}
                </Typography>
                <Typography
                  type="xs"
                  color={DefaultHintFontColor}
                  marginTop={DefaultMargin / 4}
                >
                  {classroom?.name} · {video?.category}
                </Typography>
              </>
            )}
          </NativeView>
          <NativeView
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <NativeButton
              width={175}
              title={`Play ${isLive ? "live" : "Now"}`}
              size="sm"
              iconName="videocam"
              onPress={() => onPlay(video)}
            />
            {isLive && <Live />}
          </NativeView>
        </NativeView>
      </NativeView>
    </NativeView>
  );
}
