import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Platform, StatusBar, useWindowDimensions } from "react-native";
import NativeButton from "../../../../common/components/NativeButton";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import { HeaderMenu } from "../../../../layouts/headerNavigation/HeaderMenu";
import Live from "../../assets/Live.svg";
import {
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

  if (isLoading) {
    return (
      <NativeSkeletonPlaceholder
        items={[
          {
            width,
            height: coverHeight,
          },
        ]}
      />
    );
  }

  if (!video && !isLive) {
    return null;
  }

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
    <NativeView
      type="image"
      source={
        isLive
          ? Airboard2
          : {
              uri: video?.coverImageUrl,
            }
      }
      height={coverHeight}
      width={width}
      backgroundColor={AppTheme["color-grey"]}
    >
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="light-content"
      />
      <NativeView
        type="gradient"
        colors={["#000000", "#00000000"]}
        height={150}
      >
        <HeaderMenu />
      </NativeView>
      <NativeView
        type="gradient"
        colors={["#00000000", "#00000000", "#0000009E", "#151215"]}
        height={250}
        width={width}
        position="absolute"
        bottom={0}
        justifyContent="flex-end"
      >
        <NativeView marginHorizontal={DefaultMargin}>
          <NativeView marginBottom={DefaultMargin / 2}>
            {isLive ? (
              <>
                <Typography opacity={DefaultOpacity} type="xs">
                  {classroom?.name}
                </Typography>
              </>
            ) : (
              <>
                <Typography opacity={DefaultOpacity} type="xs">
                  {classroom?.name} · {video?.category}
                </Typography>
                <Typography family="medium" type="h3x">
                  {video?.name}
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
